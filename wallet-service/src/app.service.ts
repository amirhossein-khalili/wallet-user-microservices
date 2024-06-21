import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  async getHello() {
    await this.cacheManager.set('amir', 'hello');
    console.log(await this.cacheManager.get('amir'));
    return 'Hello World!';
  }
}
