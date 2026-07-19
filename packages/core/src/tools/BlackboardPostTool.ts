import { BlackboardService } from '../coordination/BlackboardService';

/**
 * BlackboardPostTool.ts
 * 
 * Ajanların önemli bulgularını sisteme (Karatahtaya) yazmasını sağlayan araç.
 * Sistem promptlarında "blackboard_post" aracı olarak ajanlara sunulacaktır.
 */

export class BlackboardPostTool {
  private blackboard: BlackboardService;

  constructor(blackboard: BlackboardService) {
    this.blackboard = blackboard;
  }

  public execute(args: { topic: string, content: string, authorId: string }): { status: string, entryId: string } {
    if (!args.topic || !args.content || !args.authorId) {
      throw new Error("Eksik argüman: topic, content ve authorId zorunludur.");
    }

    const id = this.blackboard.publish(args.topic, args.content, args.authorId);
    
    return {
      status: "success",
      entryId: id
    };
  }
}
