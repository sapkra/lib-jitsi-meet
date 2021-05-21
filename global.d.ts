declare class MediaRecorder {
  constructor(stream: MediaStream, data: { mimeType: string });
  static isTypeSupported(type: string): boolean;
}
