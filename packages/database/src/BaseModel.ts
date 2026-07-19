import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

/**
 * BaseModel
 * 
 * Tüm veritabanı modelleri bu base sınıftan türemek zorundadır.
 * Clean Architecture ve "Server Timestamp is Truth" kısıtlamaları gereği,
 * her kayıtta `server_id` ve sunucu kaynaklı `updated_at` (server_updated_at)
 * bulunması zorunludur. Cihaz saatine dayalı senkronizasyon çakışması çözümü yapılamaz.
 */
export class BaseModel extends Model {
  // Sunucudan gelen kalıcı ID
  @field('server_id') serverId!: string;

  // Sunucu zaman damgası (Mutlak Gerçek)
  @date('server_updated_at') serverUpdatedAt!: Date;
  
  // Yerel cihaz oluşturulma zamanı (sadece referans amaçlı)
  @readonly @date('created_at') createdAt!: Date;
  
  // Yerel cihaz güncellenme zamanı (sadece referans amaçlı)
  @readonly @date('updated_at') updatedAt!: Date;
}
