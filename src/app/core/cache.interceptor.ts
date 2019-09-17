import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpCacheService } from '../services/http-cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.method !== 'GET') {
      console.log(`Invalidating cached: ${req.method} ${req.url}`)
      this.cacheService.invalidateCache();
      return next.handle(req)
    }

    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url)

    if (cachedResponse) {
      console.log(`Returning a cached response: ${cachedResponse.url}`)
      console.log(cachedResponse);
      return of(cachedResponse)
    }

    return next.handle(req)
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(`Adding item to cache: ${req.url}`);
          this.cacheService.put(req.url, event);
        }
      })
    );
  }
}
