/**
 * Shared Image Service
 *
 * Angular service providing image URLs based on predefined image paths.
 *
 * Sections:
 * 1. Dependencies
 * 2. Service Declaration
 * 3. Image Path Mapping
 * 4. Image URL Retrieval
 *
 * @module SharedImageService
 */

// shared-image.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedImageService {
  private imagePathMapping: { [key: string]: string } = {
    'shawshankredemption.png': 'https://i.ibb.co/f0JB4nR/shawshankredemption.png',
    'pulpfiction.png': 'https://i.ibb.co/PFFksRY/pulpfiction.png',
    'forrestgump.png': 'https://i.ibb.co/51qJLVb/forrestgump.png',
    'inception.png': 'https://i.ibb.co/HFNL8G8/inception.png',
    'darkknight.png': 'https://i.ibb.co/N7cqh3S/darkknight.png',
    'schindlerslist.png': 'https://i.ibb.co/DKg1TGP/schindlerslist.png',
    'thegodfather.png': 'https://i.ibb.co/LxChkqh/thegodfather.png',
    'matrix.png': 'https://i.ibb.co/d4d7d9w/matrix.png',
    'fellowshipofthering.png': 'https://i.ibb.co/GdqGN2m/fellowshipofthering.png',
    'avengers.png': 'https://i.ibb.co/VMnhD2j/avengers.png',
    'avatar.png': 'https://i.ibb.co/wWnf0j1/avatar.png',
    'gladiator.png': 'https://i.ibb.co/NVDCF74/gladiator.png',
    'interstellar.png': 'https://i.ibb.co/0Q41dYq/interstellar.png',
    'killbill.png': 'https://i.ibb.co/7rMTV2Y/killbill.png',
    'thedeparted.png': 'https://i.ibb.co/sQNj3J6/thedeparted.png',
  };

  getImageUrl(imagePath: string): string {
    return this.imagePathMapping[imagePath] || '';
  }
}
