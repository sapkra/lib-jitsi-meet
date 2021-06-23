import JitsiConference from '../../JitsiConference';
import { MediaType } from '../../service/RTC/MediaType';
import TraceablePeerConnection from './TraceablePeerConnection';

export default class JitsiTrack {
  conference: JitsiConference;
  stream: MediaStream;
  track: MediaStreamTrack;
  type: MediaType;
  videoType: unknown;
  disposed: boolean;
  containers: unknown[];
  audioLevel: number;
  handlers: Map<unknown, unknown>;
  constructor( conference: JitsiConference, stream: unknown, track: unknown, streamInactiveHandler: unknown, trackMediaType: unknown, videoType: unknown ); // TODO:
  getType: () => MediaType;
  isAudioTrack: () => boolean;
  isWebRTCTrackMuted: () => boolean;
  isVideoTrack: () => boolean;
  isLocal: () => boolean;
  isLocalAudioTrack: () => boolean;
  getOriginalStream: () => MediaStream;
  getStreamId: () => string | null;
  getTrack: () => MediaStreamTrack;
  getTrackLabel: () => string;
  getTrackId: () => string | null;
  getUsageLabel: () => string;
  attach: ( container: HTMLElement ) => void;
  detach: ( container: HTMLElement ) => void;
  dispose: () => void;
  isScreenSharing: () => boolean;
  getId: () => string | null;
  isActive: () => boolean;
  setAudioLevel: ( audioLevel: number, tpc: TraceablePeerConnection ) => void;
  getMSID: () => string | null;
  setAudioOutput: ( audioOutputDeviceId: '' | string ) => Promise<unknown>; // TODO: what will this promise contain?
  addEventListener: (type: string, listener: (event: any) => void) => void;
}
