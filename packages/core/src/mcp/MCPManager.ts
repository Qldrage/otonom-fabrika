import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { tool } from "ai";
import { z } from "zod";

function jsonSchemaToZod(schema: any): z.ZodType<any> {
  if (!schema) return z.any();
  
  if (schema.type === "object") {
    const shape: Record<string, z.ZodType<any>> = {};
    const requiredProps = Array.isArray(schema.required) ? schema.required : [];
    
    if (schema.properties) {
      for (const [key, value] of Object.entries(schema.properties)) {
        let zodType = jsonSchemaToZod(value);
        if (!requiredProps.includes(key)) {
          zodType = zodType.optional();
        }
        if ((value as any).description) {
          zodType = zodType.describe((value as any).description);
        }
        shape[key] = zodType;
      }
    }
    return z.object(shape);
  }
  
  if (schema.type === "array") {
    const itemType = schema.items ? jsonSchemaToZod(schema.items) : z.any();
    return z.array(itemType);
  }
  
  if (schema.type === "string") {
    if (schema.enum && Array.isArray(schema.enum) && schema.enum.length > 0) {
      return z.enum(schema.enum as [string, ...string[]]);
    }
    return z.string();
  }
  
  if (schema.type === "number" || schema.type === "integer") {
    return z.number();
  }
  
  if (schema.type === "boolean") {
    return z.boolean();
  }
  
  return z.any();
}

export class MCPManager {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;

  async connect(command: string, args: string[]) {
    this.transport = new StdioClientTransport({ command, args });
    this.client = new Client({
        name: "otonom-fabrika-mcp-client",
        version: "1.0.0",
    }, {
        capabilities: {} 
    });
    
    await this.client.connect(this.transport);
    console.log(`[MCPManager] Bağlantı başarılı: ${command}`);
  }

  async getAITools(): Promise<Record<string, any>> {
    if (!this.client) throw new Error("MCP Client bağlı değil.");
    
    const { tools } = await this.client.listTools();
    const aiTools: Record<string, any> = {};

    for (const t of tools) {
      aiTools[t.name] = tool({
        description: t.description || "",
        parameters: jsonSchemaToZod(t.inputSchema) as any, 
        execute: (async (args: any) => {
          if (!this.client) throw new Error("MCP Disconnected");
          console.log(`[MCPManager] Tool Çağrıldı: ${t.name}`, args);
          const result = await this.client.callTool({
            name: t.name,
            arguments: args
          });
          return result.content;
        }) as any
      } as any);
    }

    return aiTools;
  }
}
