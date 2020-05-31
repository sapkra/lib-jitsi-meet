declare module '@lyno/lib-jitsi-meet/JitsiConference' {
  /**
   * Creates a JitsiConference object with the given name and properties.
   * Note: this constructor is not a part of the public API (objects should be
   * created using JitsiConnection.createConference).
   * @param options.config properties / settings related to the conference that
   * will be created.
   * @param options.name the name of the conference
   * @param options.connection the JitsiConnection object for this
   * JitsiConference.
   * @param {number} [options.config.avgRtpStatsN=15] how many samples are to be
   * collected by {@link AvgRTPStatsReporter}, before arithmetic mean is
   * calculated and submitted to the analytics module.
   * @param {boolean} [options.config.enableIceRestart=false] - enables the ICE
   * restart logic.
   * @param {boolean} [options.config.p2p.enabled] when set to <tt>true</tt>
   * the peer to peer mode will be enabled. It means that when there are only 2
   * participants in the conference an attempt to make direct connection will be
   * made. If the connection succeeds the conference will stop sending data
   * through the JVB connection and will use the direct one instead.
   * @param {number} [options.config.p2p.backToP2PDelay=5] a delay given in
   * seconds, before the conference switches back to P2P, after the 3rd
   * participant has left the room.
   * @param {number} [options.config.channelLastN=-1] The requested amount of
   * videos are going to be delivered after the value is in effect. Set to -1 for
   * unlimited or all available videos.
   * @param {number} [options.config.forceJVB121Ratio]
   * "Math.random() < forceJVB121Ratio" will determine whether a 2 people
   * conference should be moved to the JVB instead of P2P. The decision is made on
   * the responder side, after ICE succeeds on the P2P connection.
   * @constructor
   *
   * FIXME Make all methods which are called from lib-internal classes
   *       to non-public (use _). To name a few:
   *       {@link JitsiConference.onLocalRoleChanged}
   *       {@link JitsiConference.onUserRoleChanged}
   *       {@link JitsiConference.onMemberLeft}
   *       and so on...
   */
  class JitsiConference {
      /**
       * Creates a JitsiConference object with the given name and properties.
       * Note: this constructor is not a part of the public API (objects should be
       * created using JitsiConnection.createConference).
       * @param options.config properties / settings related to the conference that
       * will be created.
       * @param options.name the name of the conference
       * @param options.connection the JitsiConnection object for this
       * JitsiConference.
       * @param {number} [options.config.avgRtpStatsN=15] how many samples are to be
       * collected by {@link AvgRTPStatsReporter}, before arithmetic mean is
       * calculated and submitted to the analytics module.
       * @param {boolean} [options.config.enableIceRestart=false] - enables the ICE
       * restart logic.
       * @param {boolean} [options.config.p2p.enabled] when set to <tt>true</tt>
       * the peer to peer mode will be enabled. It means that when there are only 2
       * participants in the conference an attempt to make direct connection will be
       * made. If the connection succeeds the conference will stop sending data
       * through the JVB connection and will use the direct one instead.
       * @param {number} [options.config.p2p.backToP2PDelay=5] a delay given in
       * seconds, before the conference switches back to P2P, after the 3rd
       * participant has left the room.
       * @param {number} [options.config.channelLastN=-1] The requested amount of
       * videos are going to be delivered after the value is in effect. Set to -1 for
       * unlimited or all available videos.
       * @param {number} [options.config.forceJVB121Ratio]
       * "Math.random() < forceJVB121Ratio" will determine whether a 2 people
       * conference should be moved to the JVB instead of P2P. The decision is made on
       * the responder side, after ICE succeeds on the P2P connection.
       * @constructor
       *
       * FIXME Make all methods which are called from lib-internal classes
       *       to non-public (use _). To name a few:
       *       {@link JitsiConference.onLocalRoleChanged}
       *       {@link JitsiConference.onUserRoleChanged}
       *       {@link JitsiConference.onMemberLeft}
       *       and so on...
       */
      constructor(options: any);
      eventEmitter: any;
      options: any;
      eventManager: JitsiConferenceEventManager;
      participants: {};
      componentsVersions: ComponentsVersions;
      /**
       * Jingle session instance for the JVB connection.
       * @type {JingleSessionPC}
       */
      jvbJingleSession: any;
      lastDominantSpeaker: any;
      dtmfManager: any;
      somebodySupportsDTMF: boolean;
      authEnabled: boolean;
      startAudioMuted: boolean;
      startVideoMuted: boolean;
      startMutedPolicy: {
          audio: boolean;
          video: boolean;
      };
      isMutedByFocus: boolean;
      mutedByFocusActor: any;
      wasStopped: boolean;
      properties: {};
      /**
       * The object which monitors local and remote connection statistics (e.g.
       * sending bitrate) and calculates a number which represents the connection
       * quality.
       */
      connectionQuality: ConnectionQuality;
      /**
       * Reports average RTP statistics to the analytics module.
       * @type {AvgRTPStatsReporter}
       */
      avgRtpStatsReporter: AvgRTPStatsReporter;
      /**
       * Detects issues with the audio of remote participants.
       * @type {AudioOutputProblemDetector}
       */
      _audioOutputProblemDetector: AudioOutputProblemDetector;
      /**
       * Indicates whether the connection is interrupted or not.
       */
      isJvbConnectionInterrupted: boolean;
      /**
       * The object which tracks active speaker times
       */
      speakerStatsCollector: SpeakerStatsCollector;
      /**
       * Stores reference to deferred start P2P task. It's created when 3rd
       * participant leaves the room in order to avoid ping pong effect (it
       * could be just a page reload).
       * @type {number|null}
       */
      deferredStartP2PTask: number | null;
      /**
       * A delay given in seconds, before the conference switches back to P2P
       * after the 3rd participant has left.
       * @type {number}
       */
      backToP2PDelay: number;
      /**
       * If set to <tt>true</tt> it means the P2P ICE is no longer connected.
       * When <tt>false</tt> it means that P2P ICE (media) connection is up
       * and running.
       * @type {boolean}
       */
      isP2PConnectionInterrupted: boolean;
      /**
       * Flag set to <tt>true</tt> when P2P session has been established
       * (ICE has been connected) and this conference is currently in the peer to
       * peer mode (P2P connection is the active one).
       * @type {boolean}
       */
      p2p: boolean;
      /**
       * A JingleSession for the direct peer to peer connection.
       * @type {JingleSessionPC}
       */
      p2pJingleSession: any;
      videoSIPGWHandler: VideoSIPGW;
      recordingManager: RecordingManager;
      /**
       * If the conference.joined event has been sent this will store the timestamp when it happened.
       *
       * @type {undefined|number}
       * @private
       */
      private _conferenceJoinAnalyticsEventSent;
      _e2eEncryption: E2EEncryption;
      constructor(options: any): void;
      _init(options?: {
          connection: any;
      }): void;
      connection: any;
      xmpp: any;
      _statsCurrentId: any;
      room: any;
      _onIceConnectionInterrupted: any;
      _onIceConnectionRestored: any;
      _onIceConnectionEstablished: any;
      _updateProperties: any;
      _sendConferenceJoinAnalyticsEvent: any;
      e2eping: E2ePing;
      rtc: RTC;
      qualityController: QualityController;
      participantConnectionStatus: ParticipantConnectionStatusHandler;
      statistics: Statistics;
      _audioAnalyser: VADAudioAnalyser;
      _noAudioSignalDetection: NoAudioSignalDetection;
      /**
       * Emits {@link JitsiConferenceEvents.JVB121_STATUS}.
       * @type {Jvb121EventGenerator}
       */
      jvb121Status: Jvb121EventGenerator;
      p2pDominantSpeakerDetection: P2PDominantSpeakerDetection;
      join(password: string): void;
      authenticateAndUpgradeRole(options: any): any;
      isJoined(): any;
      isP2PEnabled(): boolean;
      isP2PTestModeEnabled(): boolean;
      leave(): Promise<any>;
      private _getActiveMediaSession;
      private _getMediaSessions;
      getName(): any;
      getConnection(): any;
      isAuthEnabled(): boolean;
      isLoggedIn(): boolean;
      getAuthLogin(): any;
      isExternalAuthEnabled(): any;
      getExternalAuthUrl(urlForPopup?: boolean): Promise<any>;
      getLocalTracks(mediaType?: typeof MediaType): any[];
      getLocalAudioTrack(): any | null;
      getLocalVideoTrack(): any | null;
      getPerformanceStats(): any | null;
      on(eventId: any, handler: any): void;
      off(eventId: any, handler?: any): void;
      addEventListener: any;
      removeEventListener: any;
      addCommandListener(command: string, handler: Function): void;
      removeCommandListener(command: string, handler: Function): void;
      sendTextMessage(message: any, elementName?: string): void;
      sendPrivateTextMessage(id: any, message: any, elementName?: string): void;
      sendCommand(name: string, values: any): void;
      sendCommandOnce(name: string, values: any): void;
      removeCommand(name: string): void;
      setDisplayName(name: any): void;
      setSubject(subject: string): void;
      getTranscriber(): typeof Transcriber;
      transcriber: any;
      getTranscriptionStatus(): string;
      addTrack(track: any): Promise<any>;
      _fireAudioLevelChangeEvent(audioLevel: number, tpc?: any): void;
      _fireMuteChangeEvent(track: any): void;
      onLocalTrackRemoved(track: any): void;
      removeTrack(track: any): Promise<any>;
      replaceTrack(oldTrack: any, newTrack: any): Promise<any>;
      private _doReplaceTrack;
      _setupNewTrack(newTrack: any): void;
      _addLocalTrackAsUnmute(track: any): Promise<any>;
      _removeLocalTrackAsMute(track: any): Promise<any>;
      getRole(): string;
      isHidden(): boolean | null;
      isModerator(): boolean | null;
      lock(password: string): Promise<any>;
      unlock(): Promise<any>;
      selectParticipant(participantId: any): void;
      selectParticipants(participantIds: any): void;
      pinParticipant(participantId: any): void;
      getLastN(): number;
      setLastN(lastN: any): void;
      isInLastN(participantId: string): boolean;
      getParticipants(): any[];
      getParticipantCount(countHidden?: boolean): number;
      getParticipantById(id: any): JitsiParticipant;
      grantOwner(id: string): void;
      kickParticipant(id: string): void;
      private _maybeClearSITimeout;
      _sessionInitiateTimeout: any;
      private _maybeSetSITimeout;
      muteParticipant(id: string): void;
      onMemberJoined(jid: any, nick: any, role: any, isHidden: any, statsID: any, status: any, identity: any, botType: any, fullJid: any, features: any): void;
      private _onMucJoined;
      private _updateFeatures;
      private _onMemberBotTypeChanged;
      onMemberLeft(jid: any): void;
      onMemberKicked(isSelfPresence: boolean, actorId: string, kickedParticipantId: string | null): void;
      onLocalRoleChanged(role: string): void;
      onUserRoleChanged(jid: any, role: any): void;
      onDisplayNameChanged(jid: any, displayName: any): void;
      onRemoteTrackAdded(track: any): void;
      onCallAccepted(session: any, answer: any): void;
      onTransportInfo(session: any, transportInfo: any): void;
      onRemoteTrackRemoved(removedTrack: any): void;
      _onIncomingCallP2P(jingleSession: any, jingleOffer: any): void;
      onIncomingCall(jingleSession: any, jingleOffer: any, now: any): void;
      _acceptJvbIncomingCall(jingleSession: any, jingleOffer: any, now: any): void;
      _setBridgeChannel(offerIq: any, pc: any): void;
      private _rejectIncomingCall;
      onCallEnded(jingleSession: any, reasonCondition: string, reasonText: string | null): void;
      onSuspendDetected(jingleSession: any): void;
      updateDTMFSupport(): void;
      isDTMFSupported(): boolean;
      myUserId(): string;
      sendTones(tones: any, duration: any, pause: any): void;
      startRecording(options: any): Promise<any>;
      stopRecording(sessionID: string): Promise<any>;
      isSIPCallingSupported(): any;
      dial(number: any): any;
      hangup(): any;
      startTranscriber(): any;
      /**
       * Stops the transcription service.
       */
      stopTranscriber: any;
      getPhoneNumber(): any;
      getPhonePin(): any;
      getMeetingUniqueId(): string | undefined;
      public getActivePeerConnection(): any | null;
      getConnectionState(): string | null;
      setStartMutedPolicy(policy: any): void;
      getStartMutedPolicy(): any;
      isStartAudioMuted(): boolean;
      isStartVideoMuted(): boolean;
      getConnectionTimes(): any;
      setLocalParticipantProperty(name: any, value: any): void;
      removeLocalParticipantProperty(name: any): void;
      getLocalParticipantProperty(name: any): any;
      sendFeedback(overallFeedback: any, detailedFeedback: any): Promise<any>;
      isCallstatsEnabled(): boolean;
      getSsrcByTrack(track: any): number | undefined;
      _onTrackAttach(track: any | any, container: any): void;
      sendApplicationLog(message: string): void;
      _isFocus(mucJid: any): boolean | null;
      _fireIncompatibleVersionsEvent(): void;
      sendEndpointMessage(to: string, payload: object): void;
      broadcastEndpointMessage(payload: object): void;
      sendMessage(message: string | object, to?: string, sendThroughVideobridge?: boolean): void;
      isConnectionInterrupted(): boolean;
      private _onIceConnectionFailed;
      _delayedIceFailed: IceFailedHandling;
      private _acceptP2PIncomingCall;
      private _addRemoteJVBTracks;
      private _addRemoteP2PTracks;
      private _addRemoteTracks;
      p2pEstablishmentDuration: any;
      jvbEstablishmentDuration: any;
      getProperty(key: string): any;
      private _maybeClearDeferredStartP2P;
      private _removeRemoteJVBTracks;
      private _removeRemoteP2PTracks;
      private _removeRemoteTracks;
      private _resumeMediaTransferForJvbConnection;
      private _setP2PStatus;
      private _startP2PSession;
      private _suspendMediaTransferForJvbConnection;
      private _maybeStartOrStopP2P;
      private _shouldBeInP2PMode;
      private _stopP2PSession;
      isP2PActive(): boolean;
      getP2PConnectionState(): string | null;
      startP2PSession(): void;
      stopP2PSession(): void;
      getSpeakerStats(): object;
      setReceiverVideoConstraint(maxFrameHeight: number): void;
      setSenderVideoConstraint(maxFrameHeight: number): Promise<any>;
      createVideoSIPGWSession(sipAddress: string, displayName: string): any | Error;
      private _sendConferenceLeftAnalyticsEvent;
      _restartMediaSessions(): void;
      _isE2EEEnabled(): boolean;
      isE2EESupported(): boolean;
      toggleE2EE(enabled: boolean): void;
      isLobbySupported(): boolean;
      isMembersOnly(): boolean;
      enableLobby(): Promise<any>;
      disableLobby(): void;
      joinLobby(displayName: string, email: string): Promise<never>;
      lobbyDenyAccess(id: string): void;
      lobbyApproveAccess(id: string): void;
  }
  namespace JitsiConference {
      function resourceCreator(jid: string, isAuthenticatedUser: boolean): string;
  }
  export default JitsiConference;
  import JitsiConferenceEventManager from "@lyno/lib-jitsi-meet/JitsiConferenceEventManager";
  import ComponentsVersions from "@lyno/lib-jitsi-meet/modules/version/ComponentsVersions";
  import ConnectionQuality from "@lyno/lib-jitsi-meet/modules/connectivity/ConnectionQuality";
  import AvgRTPStatsReporter from "@lyno/lib-jitsi-meet/modules/statistics/AvgRTPStatsReporter";
  import AudioOutputProblemDetector from "@lyno/lib-jitsi-meet/modules/statistics/AudioOutputProblemDetector";
  import SpeakerStatsCollector from "@lyno/lib-jitsi-meet/modules/statistics/SpeakerStatsCollector";
  import VideoSIPGW from "@lyno/lib-jitsi-meet/modules/videosipgw/VideoSIPGW";
  import RecordingManager from "@lyno/lib-jitsi-meet/modules/recording/RecordingManager";
  import { E2EEncryption } from "@lyno/lib-jitsi-meet/modules/e2ee/E2EEncryption";
  import E2ePing from "@lyno/lib-jitsi-meet/modules/e2eping/e2eping";
  import RTC from "@lyno/lib-jitsi-meet/modules/RTC/RTC";
  import { QualityController } from "@lyno/lib-jitsi-meet/modules/qualitycontrol/QualityController";
  import ParticipantConnectionStatusHandler from "@lyno/lib-jitsi-meet/modules/connectivity/ParticipantConnectionStatus";
  import Statistics from "@lyno/lib-jitsi-meet/modules/statistics/statistics";
  import VADAudioAnalyser from "@lyno/lib-jitsi-meet/modules/detection/VADAudioAnalyser";
  import NoAudioSignalDetection from "@lyno/lib-jitsi-meet/modules/detection/NoAudioSignalDetection";
  import Jvb121EventGenerator from "@lyno/lib-jitsi-meet/modules/event/Jvb121EventGenerator";
  import P2PDominantSpeakerDetection from "@lyno/lib-jitsi-meet/modules/detection/P2PDominantSpeakerDetection";
  import * as MediaType from "@lyno/lib-jitsi-meet/service/RTC/MediaType";
  import Transcriber from "@lyno/lib-jitsi-meet/modules/transcription/transcriber";
  import JitsiParticipant from "@lyno/lib-jitsi-meet/JitsiParticipant";
  import IceFailedHandling from "@lyno/lib-jitsi-meet/modules/connectivity/IceFailedHandling";

}
declare module '@lyno/lib-jitsi-meet/JitsiConferenceErrors' {
  /**
   * The errors for the conference.
   */
  /**
   * Indicates that client must be authenticated to create the conference.
   */
  export const AUTHENTICATION_REQUIRED: "conference.authenticationRequired";
  /**
   * Indicates that chat error occurred.
   */
  export const CHAT_ERROR: "conference.chatError";
  /**
   * Indicates that conference has been destroyed.
   */
  export const CONFERENCE_DESTROYED: "conference.destroyed";
  /**
   * Indicates that max users limit has been reached.
   */
  export const CONFERENCE_MAX_USERS: "conference.max_users";
  /**
   * Indicates that a connection error occurred when trying to join a conference.
   */
  export const CONNECTION_ERROR: "conference.connectionError";
  /**
   * Indicates that a connection error is due to not allowed,
   * occurred when trying to join a conference.
   */
  export const NOT_ALLOWED_ERROR: "conference.connectionError.notAllowed";
  /**
   * Indicates that a connection error is due to not allowed,
   * occurred when trying to join a conference, only approved members are allowed to join.
   */
  export const MEMBERS_ONLY_ERROR: "conference.connectionError.membersOnly";
  /**
   * Indicates that a connection error is due to denied access to the room,
   * occurred after joining a lobby room and access is denied by the room moderators.
   */
  export const CONFERENCE_ACCESS_DENIED: "conference.connectionError.accessDenied";
  /**
   * Indicates that focus error happened.
   */
  export const FOCUS_DISCONNECTED: "conference.focusDisconnected";
  /**
   * Indicates that focus left the conference.
   */
  export const FOCUS_LEFT: "conference.focusLeft";
  /**
   * Indicates that graceful shutdown happened.
   */
  export const GRACEFUL_SHUTDOWN: "conference.gracefulShutdown";
  /**
   * Indicates that the media connection has failed.
   */
  export const ICE_FAILED: "conference.iceFailed";
  /**
   * Indicates that the versions of the server side components are incompatible
   * with the client side.
   */
  export const INCOMPATIBLE_SERVER_VERSIONS: "conference.incompatible_server_versions";
  /**
   * Indicates that offer/answer had failed.
   */
  export const OFFER_ANSWER_FAILED: "conference.offerAnswerFailed";
  /**
   * Indicates that password cannot be set for this conference.
   */
  export const PASSWORD_NOT_SUPPORTED: "conference.passwordNotSupported";
  /**
   * Indicates that a password is required in order to join the conference.
   */
  export const PASSWORD_REQUIRED: "conference.passwordRequired";
  /**
   * Indicates that reservation system returned error.
   */
  export const RESERVATION_ERROR: "conference.reservationError";
  /**
   * Indicates that there is no available videobridge.
   */
  export const VIDEOBRIDGE_NOT_AVAILABLE: "conference.videobridgeNotAvailable";

}
declare module '@lyno/lib-jitsi-meet/JitsiConferenceEventManager' {
  /**
   * Setups all event listeners related to conference
   * @param conference {JitsiConference} the conference
   */
  export default function JitsiConferenceEventManager(conference: any): void;
  export default class JitsiConferenceEventManager {
      /**
       * Setups all event listeners related to conference
       * @param conference {JitsiConference} the conference
       */
      constructor(conference: any);
      conference: any;
      xmppListeners: {};
      setupChatRoomListeners(): void;
      chatRoomForwarder: any;
      setupRTCListeners(): void;
      removeXMPPListeners(): void;
      setupXMPPListeners(): void;
      _addConferenceXMPPListener(eventName: any, listener: any): void;
      setupStatisticsListeners(): void;
  }

}
declare module '@lyno/lib-jitsi-meet/JitsiConferenceEvents' {
  /**
   * The events for the conference.
   */
  /**
   * Event indicates that the current conference audio input switched between audio
   * input states,i.e. with or without audio input.
   */
  export const AUDIO_INPUT_STATE_CHANGE: "conference.audio_input_state_changed";
  /**
   * Indicates that authentication status changed.
   */
  export const AUTH_STATUS_CHANGED: "conference.auth_status_changed";
  /**
   * Fired just before the statistics module is disposed and it's the last chance
   * to submit some logs to the statistics service (ex. CallStats if enabled),
   * before it's disconnected.
   */
  export const BEFORE_STATISTICS_DISPOSED: "conference.beforeStatisticsDisposed";
  /**
   * Indicates that an error occured.
   */
  export const CONFERENCE_ERROR: "conference.error";
  /**
   * Indicates that conference failed.
   */
  export const CONFERENCE_FAILED: "conference.failed";
  /**
   * Indicates that conference has been joined. The event does NOT provide any
   * parameters to its listeners.
   */
  export const CONFERENCE_JOINED: "conference.joined";
  /**
   * Indicates that conference has been left.
   */
  export const CONFERENCE_LEFT: "conference.left";
  /**
   * Indicates that the connection to the conference has been established
   * XXX This is currently fired whenVthe *ICE* connection enters 'connected'
   * state for the first time.
   */
  export const CONNECTION_ESTABLISHED: "conference.connectionEstablished";
  /**
   * Indicates that the connection to the conference has been interrupted for some
   * reason.
   * XXX This is currently fired when the *ICE* connection is interrupted.
   */
  export const CONNECTION_INTERRUPTED: "conference.connectionInterrupted";
  /**
   * Indicates that the connection to the conference has been restored.
   * XXX This is currently fired when the *ICE* connection is restored.
   */
  export const CONNECTION_RESTORED: "conference.connectionRestored";
  /**
   * A connection to the video bridge's data channel has been established.
   */
  export const DATA_CHANNEL_OPENED: "conference.dataChannelOpened";
  /**
   * A user has changed it display name
   */
  export const DISPLAY_NAME_CHANGED: "conference.displayNameChanged";
  /**
   * The dominant speaker was changed.
   */
  export const DOMINANT_SPEAKER_CHANGED: "conference.dominantSpeaker";
  /**
   * UTC conference timestamp when first participant joined.
   */
  export const CONFERENCE_CREATED_TIMESTAMP: "conference.createdTimestamp";
  /**
   * Indicates that DTMF support changed.
   */
  export const DTMF_SUPPORT_CHANGED: "conference.dtmfSupportChanged";
  /**
   * Indicates that a message from another participant is received on data
   * channel.
   */
  export const ENDPOINT_MESSAGE_RECEIVED: "conference.endpoint_message_received";
  /**
   * NOTE This is lib-jitsi-meet internal event and can be removed at any time !
   *
   * Event emitted when conference transits, between one to one and multiparty JVB
   * conference. If the conference switches to P2P it's neither one to one nor
   * a multiparty JVB conference, but P2P (the status argument of this event will
   * be <tt>false</tt>).
   *
   * The first argument is a boolean which carries the previous value and
   * the seconds argument is a boolean with the new status. The event is emitted
   * only if the previous and the new values are different.
   *
   * @type {string}
   */
  export const JVB121_STATUS: string;
  /**
   * You are kicked from the conference.
   * @param {JitsiParticipant} the participant that initiated the kick.
   */
  export const KICKED: "conference.kicked";
  /**
   * Participant was kicked from the conference.
   * @param {JitsiParticipant} the participant that initiated the kick.
   * @param {JitsiParticipant} the participant that was kicked.
   */
  export const PARTICIPANT_KICKED: "conference.participant_kicked";
  /**
   * The Last N set is changed.
   *
   * @param {Array<string>|null} leavingEndpointIds the ids of all the endpoints
   * which are leaving Last N
   * @param {Array<string>|null} enteringEndpointIds the ids of all the endpoints
   * which are entering Last N
   */
  export const LAST_N_ENDPOINTS_CHANGED: "conference.lastNEndpointsChanged";
  /**
   * Indicates that the room has been locked or unlocked.
   */
  export const LOCK_STATE_CHANGED: "conference.lock_state_changed";
  /**
   * Indicates that the region of the media server (jitsi-videobridge) that we
   * are connected to changed (or was initially set).
   * @type {string} the region.
   */
  export const SERVER_REGION_CHANGED: string;
  /**
   * An event(library-private) fired when a new media session is added to the conference.
   * @type {string}
   * @private
   */
  export const _MEDIA_SESSION_STARTED: string;
  /**
   * An event(library-private) fired when the conference switches the currently active media session.
   * @type {string}
   * @private
   */
  export const _MEDIA_SESSION_ACTIVE_CHANGED: string;
  /**
   * Indicates that the conference had changed to members only enabled/disabled.
   * The first argument of this event is a <tt>boolean</tt> which when set to
   * <tt>true</tt> means that the conference is running in members only mode.
   * You may need to use Lobby if supported to ask for permissions to enter the conference.
   */
  export const MEMBERS_ONLY_CHANGED: "conference.membersOnlyChanged";
  /**
   * New text message was received.
   */
  export const MESSAGE_RECEIVED: "conference.messageReceived";
  /**
   * Event indicates that the current selected input device has no signal
   */
  export const NO_AUDIO_INPUT: "conference.no_audio_input";
  /**
   * Event indicates that the current microphone used by the conference is noisy.
   */
  export const NOISY_MIC: "conference.noisy_mic";
  /**
   * New private text message was received.
   */
  export const PRIVATE_MESSAGE_RECEIVED: "conference.privateMessageReceived";
  /**
   * Event fired when JVB sends notification about interrupted/restored user's
   * ICE connection status or we detect local problem with the video track.
   * First argument is the ID of the participant and
   * the seconds is a string indicating if the connection is currently
   * - active - the connection is active
   * - inactive - the connection is inactive, was intentionally interrupted by
   * the bridge
   * - interrupted - a network problem occurred
   * - restoring - the connection was inactive and is restoring now
   *
   * The current status value can be obtained by calling
   * JitsiParticipant.getConnectionStatus().
   */
  export const PARTICIPANT_CONN_STATUS_CHANGED: "conference.participant_conn_status_changed";
  /**
   * Indicates that the features of the participant has been changed.
   */
  export const PARTCIPANT_FEATURES_CHANGED: "conference.partcipant_features_changed";
  /**
   * Indicates that a the value of a specific property of a specific participant
   * has changed.
   */
  export const PARTICIPANT_PROPERTY_CHANGED: "conference.participant_property_changed";
  /**
   * Indicates that the conference has switched between JVB and P2P connections.
   * The first argument of this event is a <tt>boolean</tt> which when set to
   * <tt>true</tt> means that the conference is running on the P2P connection.
   */
  export const P2P_STATUS: "conference.p2pStatus";
  /**
   * Indicates that phone number changed.
   */
  export const PHONE_NUMBER_CHANGED: "conference.phoneNumberChanged";
  /**
   * The conference properties changed.
   * @type {string}
   */
  export const PROPERTIES_CHANGED: string;
  /**
   * Indicates that recording state changed.
   */
  export const RECORDER_STATE_CHANGED: "conference.recorderStateChanged";
  /**
   * Indicates that video SIP GW state changed.
   * @param {VideoSIPGWConstants} status.
   */
  export const VIDEO_SIP_GW_AVAILABILITY_CHANGED: "conference.videoSIPGWAvailabilityChanged";
  /**
   * Indicates that video SIP GW Session state changed.
   * @param {options} event - {
   *     {string} address,
   *     {VideoSIPGWConstants} oldState,
   *     {VideoSIPGWConstants} newState,
   *     {string} displayName}
   * }.
   */
  export const VIDEO_SIP_GW_SESSION_STATE_CHANGED: "conference.videoSIPGWSessionStateChanged";
  /**
   * Indicates that start muted settings changed.
   */
  export const START_MUTED_POLICY_CHANGED: "conference.start_muted_policy_changed";
  /**
   * Indicates that the local user has started muted.
   */
  export const STARTED_MUTED: "conference.started_muted";
  /**
   * Indicates that subject of the conference has changed.
   */
  export const SUBJECT_CHANGED: "conference.subjectChanged";
  /**
   * Indicates that DTMF support changed.
   */
  export const SUSPEND_DETECTED: "conference.suspendDetected";
  /**
   * Event indicates that local user is talking while he muted himself
   */
  export const TALK_WHILE_MUTED: "conference.talk_while_muted";
  /**
   * A new media track was added to the conference. The event provides the
   * following parameters to its listeners:
   *
   * @param {JitsiTrack} track the added JitsiTrack
   */
  export const TRACK_ADDED: "conference.trackAdded";
  /**
   * Audio levels of a media track ( attached to the conference) was changed.
   */
  export const TRACK_AUDIO_LEVEL_CHANGED: "conference.audioLevelsChanged";
  /**
   * A media track ( attached to the conference) mute status was changed.
   * @param {JitsiParticipant|null} the participant that initiated the mute
   * if it is a remote mute.
   */
  export const TRACK_MUTE_CHANGED: "conference.trackMuteChanged";
  /**
   * The media track was removed from the conference. The event provides the
   * following parameters to its listeners:
   *
   * @param {JitsiTrack} track the removed JitsiTrack
   */
  export const TRACK_REMOVED: "conference.trackRemoved";
  /**
   * Notifies for transcription status changes. The event provides the
   * following parameters to its listeners:
   *
   * @param {String} status - The new status.
   */
  export const TRANSCRIPTION_STATUS_CHANGED: "conference.transcriptionStatusChanged";
  /**
   * A new user joined the conference.
   */
  export const USER_JOINED: "conference.userJoined";
  /**
   * A user has left the conference.
   */
  export const USER_LEFT: "conference.userLeft";
  /**
   * User role changed.
   */
  export const USER_ROLE_CHANGED: "conference.roleChanged";
  /**
   * User status changed.
   */
  export const USER_STATUS_CHANGED: "conference.statusChanged";
  /**
   * Event indicates that the bot participant type changed.
   */
  export const BOT_TYPE_CHANGED: "conference.bot_type_changed";
  /**
   * A new user joined the lobby room.
   */
  export const LOBBY_USER_JOINED: "conference.lobby.userJoined";
  /**
   * A user from the lobby room has been update.
   */
  export const LOBBY_USER_UPDATED: "conference.lobby.userUpdated";
  /**
   * A user left the lobby room.
   */
  export const LOBBY_USER_LEFT: "conference.lobby.userLeft";

}
declare module '@lyno/lib-jitsi-meet/JitsiConnection' {
  /**
   * Creates a new connection object for the Jitsi Meet server side video
   * conferencing service. Provides access to the JitsiConference interface.
   * @param appID identification for the provider of Jitsi Meet video conferencing
   * services.
   * @param token the JWT token used to authenticate with the server(optional)
   * @param options Object with properties / settings related to connection with
   * the server.
   * @constructor
   */
  export default function JitsiConnection(appID: any, token: any, options: any): void;
  export default class JitsiConnection {
      /**
       * Creates a new connection object for the Jitsi Meet server side video
       * conferencing service. Provides access to the JitsiConference interface.
       * @param appID identification for the provider of Jitsi Meet video conferencing
       * services.
       * @param token the JWT token used to authenticate with the server(optional)
       * @param options Object with properties / settings related to connection with
       * the server.
       * @constructor
       */
      constructor(appID: any, token: any, options: any);
      appID: any;
      token: any;
      options: any;
      xmpp: XMPP;
      connect(options?: object): void;
      attach(options: object): void;
      disconnect(...args: any[]): Promise<any>;
      getJid(): string;
      setToken(token: any): void;
      initJitsiConference(name: any, options: any): JitsiConference;
      addEventListener(event: typeof JitsiConnectionEvents, listener: Function): void;
      removeEventListener(event: typeof JitsiConnectionEvents, listener: Function): void;
      getConnectionTimes(): {};
      addFeature(feature: string, submit?: boolean): void;
      removeFeature(feature: string, submit?: boolean): void;
      getLogs(): any;
  }
  import XMPP from "@lyno/lib-jitsi-meet/modules/xmpp/xmpp";
  import JitsiConference from "@lyno/lib-jitsi-meet/JitsiConference";
  import * as JitsiConnectionEvents from "@lyno/lib-jitsi-meet/JitsiConnectionEvents";

}
declare module '@lyno/lib-jitsi-meet/JitsiConnectionErrors' {
  /**
   * The errors for the connection.
   */
  /**
   * Indicates that the connection was dropped with an error which was most likely
   * caused by some networking issues. The dropped term in this context means that
   * the connection was closed unexpectedly (not on user's request).
   *
   * One example is 'item-not-found' error thrown by Prosody when the BOSH session
   * times out after 60 seconds of inactivity. On the other hand 'item-not-found'
   * could also happen when BOSH request is sent to the server with the session-id
   * that is not know to the server. But this should not happen in lib-jitsi-meet
   * case as long as the service is configured correctly (there is no bug).
   */
  export const CONNECTION_DROPPED_ERROR: "connection.droppedError";
  /**
   * Not specified errors.
   */
  export const OTHER_ERROR: "connection.otherError";
  /**
   * Indicates that a password is required in order to join the conference.
   */
  export const PASSWORD_REQUIRED: "connection.passwordRequired";
  /**
   * Indicates that the connection was dropped, because of too many 5xx HTTP
   * errors on BOSH requests.
   */
  export const SERVER_ERROR: "connection.serverError";

}
declare module '@lyno/lib-jitsi-meet/JitsiConnectionEvents' {
  /**
   * The events for the connection.
   */
  /**
   * Indicates that the connection has been disconnected. The event provides
   * the following parameters to its listeners:
   *
   * @param msg {string} a message associated with the disconnect such as the
   * last (known) error message
   */
  export const CONNECTION_DISCONNECTED: "connection.connectionDisconnected";
  /**
   * Indicates that the connection has been established. The event provides
   * the following parameters to its listeners:
   *
   * @param id {string} the ID of the local endpoint/participant/peer (within
   * the context of the established connection)
   */
  export const CONNECTION_ESTABLISHED: "connection.connectionEstablished";
  /**
   * Indicates that the connection has been failed for some reason. The event
   * provides the following parameters to its listeners:
   *
   * @param errType {JitsiConnectionErrors} the type of error associated with
   * the failure
   * @param errReason {string} the error (message) associated with the failure
   * @param credentials {object} the credentials used to connect (if any)
   * @param errReasonDetails {object} an optional object with details about
   * the error, like shard moving, suspending. Used for analytics purposes.
   */
  export const CONNECTION_FAILED: "connection.connectionFailed";
  /**
   * Indicates that the performed action cannot be executed because the
   * connection is not in the correct state(connected, disconnected, etc.)
   */
  export const WRONG_STATE: "connection.wrongState";
  /**
   * Indicates that the display name is required over this connection and need to be supplied when
   * joining the room.
   * There are cases like lobby room where display name is required.
   */
  export const DISPLAY_NAME_REQUIRED: "connection.display_name_required";

}
declare module '@lyno/lib-jitsi-meet/JitsiMediaDevices' {
  var _default: JitsiMediaDevices;
  export default _default;
  /**
   * Media devices utilities for Jitsi.
   */
  class JitsiMediaDevices {
      _eventEmitter: any;
      _grantedPermissions: {};
      _permissionsApiSupported: Promise<any>;
      /**
       * Updated the local granted permissions cache. A permissions might be
       * granted, denied, or undefined. This is represented by having its media
       * type key set to {@code true} or {@code false} respectively.
       *
       * @param {Object} grantedPermissions - Array with the permissions
       * which were granted.
       */
      _handleGrantedPermissions(grantedPermissions: any): void;
      /**
       * Gathers data and sends it to statistics.
       * @param deviceID the device id to log
       * @param devices list of devices
       */
      _logOutputDevice(deviceID: any, devices: any): void;
      /**
       * Executes callback with list of media devices connected.
       * @param {function} callback
       */
      enumerateDevices(callback: Function): void;
      /**
       * Checks if its possible to enumerate available cameras/micropones.
       * @returns {Promise<boolean>} a Promise which will be resolved only once
       * the WebRTC stack is ready, either with true if the device listing is
       * available available or with false otherwise.
       */
      isDeviceListAvailable(): Promise<boolean>;
      /**
       * Returns true if changing the input (camera / microphone) or output
       * (audio) device is supported and false if not.
       * @param {string} [deviceType] - type of device to change. Default is
       *      undefined or 'input', 'output' - for audio output device change.
       * @returns {boolean} true if available, false otherwise.
       */
      isDeviceChangeAvailable(deviceType?: string): boolean;
      /**
       * Checks if the permission for the given device was granted.
       *
       * @param {'audio'|'video'} [type] - type of devices to check,
       *      undefined stands for both 'audio' and 'video' together
       * @returns {Promise<boolean>}
       */
      isDevicePermissionGranted(type?: 'audio' | 'video'): Promise<boolean>;
      /**
       * Returns true if it is possible to be simultaneously capturing audio
       * from more than one device.
       *
       * @returns {boolean}
       */
      isMultipleAudioInputSupported(): boolean;
      /**
       * Returns currently used audio output device id, 'default' stands
       * for default device
       * @returns {string}
       */
      getAudioOutputDevice(): string;
      /**
       * Sets current audio output device.
       * @param {string} deviceId - id of 'audiooutput' device from
       *      navigator.mediaDevices.enumerateDevices(), 'default' is for
       *      default device
       * @returns {Promise} - resolves when audio output is changed, is rejected
       *      otherwise
       */
      setAudioOutputDevice(deviceId: string): Promise<any>;
      /**
       * Adds an event handler.
       * @param {string} event - event name
       * @param {function} handler - event handler
       */
      addEventListener(event: string, handler: Function): void;
      /**
       * Removes event handler.
       * @param {string} event - event name
       * @param {function} handler - event handler
       */
      removeEventListener(event: string, handler: Function): void;
      /**
       * Emits an event.
       * @param {string} event - event name
       */
      emitEvent(event: string, ...args: any[]): void;
  }

}
declare module '@lyno/lib-jitsi-meet/JitsiMediaDevicesEvents' {
  /**
   * The events for the media devices.
   */
  /**
   * Indicates that the list of available media devices has been changed. The
   * event provides the following parameters to its listeners:
   *
   * @param {MediaDeviceInfo[]} devices - array of MediaDeviceInfo or
   *  MediaDeviceInfo-like objects that are currently connected.
   *  @see https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo
   */
  export const DEVICE_LIST_CHANGED: "mediaDevices.devicechange";
  /**
   * Indicates that the environment is currently showing permission prompt to
   * access camera and/or microphone. The event provides the following
   * parameters to its listeners:
   *
   * @param {'chrome'|'opera'|'firefox'|'safari'|'nwjs'
   *  |'react-native'|'android'} environmentType - type of browser or
   *  other execution environment.
   */
  export const PERMISSION_PROMPT_IS_SHOWN: "mediaDevices.permissionPromptIsShown";

}
declare module '@lyno/lib-jitsi-meet/JitsiMeetJS' {
  var _default: any;
  export default _default;

}
declare module '@lyno/lib-jitsi-meet/JitsiParticipant' {
  /**
   * Represents a participant in (i.e. a member of) a conference.
   */
  export default class JitsiParticipant {
      /**
       * Initializes a new JitsiParticipant instance.
       *
       * @constructor
       * @param jid the conference XMPP jid
       * @param conference
       * @param displayName
       * @param {Boolean} hidden - True if the new JitsiParticipant instance is to
       * represent a hidden participant; otherwise, false.
       * @param {string} statsID - optional participant statsID
       * @param {string} status - the initial status if any.
       * @param {object} identity - the xmpp identity
       */
      constructor(jid: any, conference: any, displayName: any, hidden: boolean, statsID: string, status: string, identity: object);
      _jid: any;
      _id: any;
      _conference: any;
      _displayName: any;
      _supportsDTMF: boolean;
      _tracks: any[];
      _role: string;
      _status: string;
      _hidden: boolean;
      _statsID: string;
      _connectionStatus: string;
      _properties: {};
      _identity: any;
      _features: Set<any>;
      /**
       * @returns {JitsiConference} The conference that this participant belongs
       * to.
       */
      getConference(): any;
      /**
       * Gets the value of a property of this participant.
       */
      getProperty(name: any): any;
      /**
       * Checks whether this <tt>JitsiParticipant</tt> has any video tracks which
       * are muted according to their underlying WebRTC <tt>MediaStreamTrack</tt>
       * muted status.
       * @return {boolean} <tt>true</tt> if this <tt>participant</tt> contains any
       * video <tt>JitsiTrack</tt>s which are muted as defined in
       * {@link JitsiTrack.isWebRTCTrackMuted}.
       */
      hasAnyVideoTrackWebRTCMuted(): boolean;
      /**
       * Updates participant's connection status.
       * @param {string} state the current participant connection state.
       * {@link ParticipantConnectionStatus}.
       * @private
       */
      private _setConnectionStatus;
      /**
       * Return participant's connectivity status.
       *
       * @returns {string} the connection status
       * <tt>ParticipantConnectionStatus</tt> of the user.
       * {@link ParticipantConnectionStatus}.
       */
      getConnectionStatus(): string;
      /**
       * Sets the value of a property of this participant, and fires an event if
       * the value has changed.
       * @name the name of the property.
       * @value the value to set.
       */
      setProperty(name: any, value: any): void;
      /**
       * @returns {Array.<JitsiTrack>} The list of media tracks for this
       * participant.
       */
      getTracks(): Array<any>;
      /**
       * @param {MediaType} mediaType
       * @returns {Array.<JitsiTrack>} an array of media tracks for this
       * participant, for given media type.
       */
      getTracksByMediaType(mediaType: typeof MediaType): Array<any>;
      /**
       * @returns {String} The ID of this participant.
       */
      getId(): string;
      /**
       * @returns {String} The JID of this participant.
       */
      getJid(): string;
      /**
       * @returns {String} The human-readable display name of this participant.
       */
      getDisplayName(): string;
      /**
       * @returns {String} The stats ID of this participant.
       */
      getStatsID(): string;
      /**
       * @returns {String} The status of the participant.
       */
      getStatus(): string;
      /**
       * @returns {Boolean} Whether this participant is a moderator or not.
       */
      isModerator(): boolean;
      /**
       * @returns {Boolean} Whether this participant is a hidden participant. Some
       * special system participants may want to join hidden (like for example the
       * recorder).
       */
      isHidden(): boolean;
      /**
       * @returns {Boolean} Whether this participant has muted their audio.
       */
      isAudioMuted(): boolean;
      /**
       * Determines whether all JitsiTracks which are of a specific MediaType and
       * which belong to this JitsiParticipant are muted.
       *
       * @param {MediaType} mediaType - The MediaType of the JitsiTracks to be
       * checked.
       * @private
       * @returns {Boolean} True if all JitsiTracks which are of the specified
       * mediaType and which belong to this JitsiParticipant are muted; otherwise,
       * false.
       */
      private _isMediaTypeMuted;
      /**
       * @returns {Boolean} Whether this participant has muted their video.
       */
      isVideoMuted(): boolean;
      /**
       * @returns {String} The role of this participant.
       */
      getRole(): string;
      /**
       *
       */
      supportsDTMF(): boolean;
      /**
       * Returns a set with the features for the participant.
       * @returns {Promise<Set<String>, Error>}
       */
      getFeatures(): Promise<Set<string>, Error>;
      /**
       * Returns a set with the features for the participant.
       * @param {int} timeout the timeout in ms for reply from the participant.
       * @returns {Promise<Set<String>, Error>}
       */
      queryFeatures(timeout?: any): Promise<Set<string>, Error>;
      _getFeaturesPromise: any;
      /**
       * Returns the bot type for the participant.
       *
       * @returns {string|undefined} - The bot type of the participant.
       */
      getBotType(): string | undefined;
  }
  import * as MediaType from "@lyno/lib-jitsi-meet/service/RTC/MediaType";

}
declare module '@lyno/lib-jitsi-meet/JitsiParticipantEvents' {

}
declare module '@lyno/lib-jitsi-meet/JitsiTrackError' {
  export default JitsiTrackError;
  /**
   *
   * Represents an error that occurred to a JitsiTrack. Can represent various
   * types of errors. For error descriptions (@see JitsiTrackErrors).
   *
   * @extends Error
   *
   *
   * @constructor
   * @param {Object|string} error - error object or error name
   * @param {Object|string} (options) - getUserMedia constraints object or
   * error message
   * @param {('audio'|'video'|'desktop'|'screen'|'audiooutput')[]} (devices) -
   * list of getUserMedia requested devices
   */
  class JitsiTrackError {
      /**
       *
       * Represents an error that occurred to a JitsiTrack. Can represent various
       * types of errors. For error descriptions (@see JitsiTrackErrors).
       *
       * @extends Error
       *
       *
       * @constructor
       * @param {Object|string} error - error object or error name
       * @param {Object|string} (options) - getUserMedia constraints object or
       * error message
       * @param {('audio'|'video'|'desktop'|'screen'|'audiooutput')[]} (devices) -
       * list of getUserMedia requested devices
       */
      constructor(error: any | string, options: any, devices: any);
      /**
       * Additional information about original getUserMedia error
       * and constraints.
       * @type {{
       *     error: Object,
       *     constraints: Object,
       *     devices: Array.<'audio'|'video'|'desktop'|'screen'>
       * }}
       */
      gum: {
          error: any;
          constraints: any;
          devices: Array<'audio' | 'video' | 'desktop' | 'screen'>;
      };
      name: string;
      message: any;
      stack: any;
      constructor(error: any | string, options: any, devices: any): void;
  }

}
declare module '@lyno/lib-jitsi-meet/JitsiTrackErrors' {
  /**
   * The errors for the JitsiTrack objects.
   */
  /**
   * An error which indicates that some of requested constraints in
   * getUserMedia call were not satisfied.
   */
  export const CONSTRAINT_FAILED: "gum.constraint_failed";
  /**
   * A generic error which indicates an error occurred while selecting
   * a DesktopCapturerSource from the electron app.
   */
  export const ELECTRON_DESKTOP_PICKER_ERROR: "gum.electron_desktop_picker_error";
  /**
   * An error which indicates a custom desktop picker could not be detected
   * for the electron app.
   */
  export const ELECTRON_DESKTOP_PICKER_NOT_FOUND: "gum.electron_desktop_picker_not_found";
  /**
   * Generic getUserMedia error.
   */
  export const GENERAL: "gum.general";
  /**
   * An error which indicates that requested device was not found.
   */
  export const NOT_FOUND: "gum.not_found";
  /**
   * An error which indicates that user denied permission to share requested
   * device.
   */
  export const PERMISSION_DENIED: "gum.permission_denied";
  /**
   * Generic error for screensharing failure.
   */
  export const SCREENSHARING_GENERIC_ERROR: "gum.screensharing_generic_error";
  /**
   * An error which indicates that user canceled screen sharing window
   * selection dialog.
   */
  export const SCREENSHARING_USER_CANCELED: "gum.screensharing_user_canceled";
  /**
   * An error which indicates that track has been already disposed and cannot
   * be longer used.
   */
  export const TRACK_IS_DISPOSED: "track.track_is_disposed";
  /**
   * An error which indicates that track has no MediaStream associated.
   */
  export const TRACK_NO_STREAM_FOUND: "track.no_stream_found";
  /**
   * An error which indicates that requested video resolution is not supported
   * by a webcam.
   */
  export const UNSUPPORTED_RESOLUTION: "gum.unsupported_resolution";

}
declare module '@lyno/lib-jitsi-meet/JitsiTrackEvents' {
  /**
   * The media track was removed to the conference.
   */
  export const LOCAL_TRACK_STOPPED: "track.stopped";
  /**
   * Audio levels of a this track was changed.
   * The first argument is a number with audio level value in range [0, 1].
   * The second argument is a <tt>TraceablePeerConnection</tt> which is the peer
   * connection which measured the audio level (one audio track can be added
   * to multiple peer connection at the same time). This argument is optional for
   * local tracks for which we can measure audio level without the peer
   * connection (the value will be <tt>undefined</tt>).
   *
   * NOTE The second argument should be treated as library internal and can be
   * removed at any time.
   */
  export const TRACK_AUDIO_LEVEL_CHANGED: "track.audioLevelsChanged";
  /**
   * The audio output of the track was changed.
   */
  export const TRACK_AUDIO_OUTPUT_CHANGED: "track.audioOutputChanged";
  /**
   * A media track mute status was changed.
   */
  export const TRACK_MUTE_CHANGED: "track.trackMuteChanged";
  /**
   * The video type("camera" or "desktop") of the track was changed.
   */
  export const TRACK_VIDEOTYPE_CHANGED: "track.videoTypeChanged";
  /**
   * Indicates that the track is not receiving any data even though we expect it
   * to receive data (i.e. the stream is not stopped).
   */
  export const NO_DATA_FROM_SOURCE: "track.no_data_from_source";
  /**
   * Indicates that the local audio track is not receiving any audio input from
   * the microphone that is currently selected.
   */
  export const NO_AUDIO_INPUT: "track.no_audio_input";

}
declare module '@lyno/lib-jitsi-meet/JitsiTranscriptionStatus' {
  /**
   * The transciption is on.
   *
   * @type {String}
   */
  export const ON: string;
  /**
   * The transciption is off.
   *
   * @type {String}
   */
  export const OFF: string;

}
declare module '@lyno/lib-jitsi-meet/authenticateAndUpgradeRole' {
  /**
   * @typedef {Object} UpgradeRoleError
   *
   * @property {JitsiConnectionErrors} [connectionError] - One of
   * {@link JitsiConnectionErrors} which occurred when trying to connect to the
   * XMPP server.
   * @property {String} [authenticationError] - One of XMPP error conditions
   * returned by Jicofo on authentication attempt. See
   * {@link https://xmpp.org/rfcs/rfc3920.html#streams-error}.
   * @property {String} [message] - More details about the error.
   * @property {Object} [credentials] - The credentials that failed the
   * authentication.
   * @property {String} [credentials.jid] - The XMPP ID part of the credentials
   * that failed the authentication.
   * @property {string} [credentials.password] - The password part of the
   * credentials that failed the authentication.
   *
   * NOTE If neither one of the errors is present, then the operation has been
   * canceled.
   */
  /**
   * Connects to the XMPP server using the specified credentials and contacts
   * Jicofo in order to obtain a session ID (which is then stored in the local
   * storage). The user's role of the parent conference will be upgraded to
   * moderator (by Jicofo). It's also used to join the conference when starting
   * from anonymous domain and only authenticated users are allowed to create new
   * rooms.
   *
   * @param {Object} options
   * @param {string} options.id - XMPP user's ID to log in. For example,
   * user@xmpp-server.com.
   * @param {string} options.password - XMPP user's password to log in with.
   * @param {string} [options.roomPassword] - The password to join the MUC with.
   * @param {Function} [options.onLoginSuccessful] - Callback called when logging
   * into the XMPP server was successful. The next step will be to obtain a new
   * session ID from Jicofo and join the MUC using it which will effectively
   * upgrade the user's role to moderator.
   * @returns {Object} A <tt>thenable</tt> which (1) settles when the process of
   * authenticating and upgrading the role of the specified XMPP user finishes and
   * (2) has a <tt>cancel</tt> method that allows the caller to interrupt the
   * process. If the process finishes successfully, the session ID has been stored
   * in the settings and the <tt>thenable</tt> is resolved. If the process
   * finishes with failure, the <tt>thenable</tt> is rejected with reason of type
   * {@link UpgradeRoleError} which will have either <tt>connectionError</tt> or
   * <tt>authenticationError</tt> property set depending on which of the steps has
   * failed. If <tt>cancel</tt> is called before the process finishes, then the
   * thenable will be rejected with an empty object (i.e. no error property will
   * be set on the rejection reason).
   */
  export default function authenticateAndUpgradeRole({ id, password, onCreateResource, onLoginSuccessful, roomPassword }: {
      id: string;
  }): any;
  export type UpgradeRoleError = {
      /**
       * - One of
       * {@link JitsiConnectionErrors} which occurred when trying to connect to the
       * XMPP server.
       */
      connectionError?: any;
      /**
       * - One of XMPP error conditions
       * returned by Jicofo on authentication attempt. See
       * {@link https://xmpp.org/rfcs/rfc3920.html#streams-error}.
       */
      authenticationError?: string;
      /**
       * - More details about the error.
       */
      message?: string;
      /**
       * - The credentials that failed the
       * authentication.
       */
      credentials?: {
          jid?: string;
          password?: string;
      };
  };

}
declare module '@lyno/lib-jitsi-meet/connection_optimization/external_connect' {
  /**
   * Requests the given webservice that will create the connection and will return
   * the necessary details(rid, sid and jid) to attach to this connection and
   * start using it. This script can be used for optimizing the connection startup
   * time. The function will send AJAX request to a webservice that should
   * create the bosh session much faster than the client because the webservice
   * can be started on the same machine as the XMPP serever.
   *
   * NOTE: It's vert important to execute this function as early as you can for
   * optimal results.
   *
   * @param webserviceUrl the url for the web service that is going to create the
   * connection.
   * @param successCallback callback function called with the result of the AJAX
   * request if the request was successfull. The callback will receive one
   * parameter which will be JS Object with properties - rid, sid and jid. This
   * result should be passed to JitsiConnection.attach method in order to use that
   * connection.
   * @param error_callback callback function called the AJAX request fail. This
   * callback is going to receive one parameter which is going to be JS error
   * object with a reason for failure in it.
   */
  function createConnectionExternally(webserviceUrl: any, successCallback: any, error_callback: any): void;

}
declare module '@lyno/lib-jitsi-meet/index' {
  const _exports: any;
  export = _exports;

}
declare module '@lyno/lib-jitsi-meet/lib-jitsi-meet.e2ee-worker' {
  export var __esModule: boolean;

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/BridgeChannel' {
  /**
   * Handles a WebRTC RTCPeerConnection or a WebSocket instance to communicate
   * with the videobridge.
   */
  export default class BridgeChannel {
      /**
       * Binds "ondatachannel" event listener on the given RTCPeerConnection
       * instance, or creates a WebSocket connection with the videobridge.
       * At least one of both, peerconnection or wsUrl parameters, must be
       * given.
       * @param {RTCPeerConnection} [peerconnection] WebRTC peer connection
       * instance.
       * @param {string} [wsUrl] WebSocket URL.
       * @param {EventEmitter} emitter the EventEmitter instance to use for event emission.
       * @param {function} senderVideoConstraintsChanged callback to call when the sender video constraints change.
       */
      constructor(peerconnection?: RTCPeerConnection, wsUrl?: string, emitter: any, senderVideoConstraintsChanged: Function);
      _channel: any;
      _eventEmitter: any;
      _mode: string;
      _areRetriesEnabled: boolean;
      _closedFromClient: boolean;
      _senderVideoConstraintsChanged: Function;
      _wsUrl: string;
      /**
       * Initializes the web socket channel.
       *
       * @returns {void}
       */
      _initWebSocket(): void;
      /**
       * Starts the websocket connection retries.
       *
       * @returns {void}
       */
      _startConnectionRetries(): void;
      _retryTimeout: NodeJS.Timeout;
      /**
       * Stops the websocket connection retries.
       *
       * @returns {void}
       */
      _stopConnectionRetries(): void;
      /**
       * Retries to establish the websocket connection after the connection was closed by the server.
       *
       * @param {CloseEvent} closeEvent - The close event that triggered the retries.
       * @returns {void}
       */
      _retryWebSocketConnection(closeEvent: CloseEvent): void;
      /**
       * The channel mode.
       * @return {string} "datachannel" or "websocket" (or null if not yet set).
       */
      get mode(): string;
      /**
       * Closes the currently opened channel.
       */
      close(): void;
      /**
       * Whether there is an underlying RTCDataChannel or WebSocket and it's
       * open.
       * @return {boolean}
       */
      isOpen(): boolean;
      /**
       * Sends message via the channel.
       * @param {string} to The id of the endpoint that should receive the
       * message. If "" the message will be sent to all participants.
       * @param  {object} payload The payload of the message.
       * @throws NetworkError or InvalidStateError from RTCDataChannel#send (@see
       * {@link https://developer.mozilla.org/docs/Web/API/RTCDataChannel/send})
       * or from WebSocket#send or Error with "No opened channel" message.
       */
      sendMessage(to: string, payload: object): void;
      /**
       * Sends a "lastN value changed" message via the channel.
       * @param {number} value The new value for lastN. -1 means unlimited.
       */
      sendSetLastNMessage(value: number): void;
      /**
       * Sends a "pinned endpoint changed" message via the channel.
       * @param {string} endpointId The id of the pinned endpoint.
       * @throws NetworkError or InvalidStateError from RTCDataChannel#send (@see
       * {@link https://developer.mozilla.org/docs/Web/API/RTCDataChannel/send})
       * or from WebSocket#send or Error with "No opened channel" message.
       */
      sendPinnedEndpointMessage(endpointId: string): void;
      /**
       * Sends a "selected endpoints changed" message via the channel.
       *
       * @param {Array<string>} endpointIds - The ids of the selected endpoints.
       * @throws NetworkError or InvalidStateError from RTCDataChannel#send (@see
       * {@link https://developer.mozilla.org/docs/Web/API/RTCDataChannel/send})
       * or from WebSocket#send or Error with "No opened channel" message.
       */
      sendSelectedEndpointsMessage(endpointIds: Array<string>): void;
      /**
       * Sends a "receiver video constraint" message via the channel.
       * @param {Number} maxFrameHeightPixels the maximum frame height,
       * in pixels, this receiver is willing to receive
       */
      sendReceiverVideoConstraintMessage(maxFrameHeightPixels: number): void;
      /**
       * Set events on the given RTCDataChannel or WebSocket instance.
       */
      _handleChannel(channel: any): void;
      /**
       * Sends passed object via the channel.
       * @param {object} jsonObject The object that will be sent.
       * @throws NetworkError or InvalidStateError from RTCDataChannel#send (@see
       * {@link https://developer.mozilla.org/docs/Web/API/RTCDataChannel/send})
       * or from WebSocket#send or Error with "No opened channel" message.
       */
      _send(jsonObject: object): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/JitsiLocalTrack' {
  /**
   * Represents a single media track(either audio or video).
   * One <tt>JitsiLocalTrack</tt> corresponds to one WebRTC MediaStreamTrack.
   */
  export default class JitsiLocalTrack extends JitsiTrack {
      /**
       * Constructs new JitsiLocalTrack instance.
       *
       * @constructor
       * @param {Object} trackInfo
       * @param {number} trackInfo.rtcId the ID assigned by the RTC module
       * @param trackInfo.stream WebRTC MediaStream, parent of the track
       * @param trackInfo.track underlying WebRTC MediaStreamTrack for new
       * JitsiRemoteTrack
       * @param trackInfo.mediaType the MediaType of the JitsiRemoteTrack
       * @param trackInfo.videoType the VideoType of the JitsiRemoteTrack
       * @param trackInfo.effects the effects array contains the effect instance to use
       * @param trackInfo.resolution the video resolution if it's a video track
       * @param trackInfo.deviceId the ID of the local device for this track
       * @param trackInfo.facingMode the camera facing mode used in getUserMedia
       * call
       * @param {sourceId} trackInfo.sourceId - The id of the desktop sharing
       * source. NOTE: defined for desktop sharing tracks only.
       */
      constructor({ deviceId, facingMode, mediaType, resolution, rtcId, sourceId, sourceType, stream, track, videoType, effects }: {
          rtcId: number;
          stream: any;
          track: any;
          mediaType: any;
          videoType: any;
          effects: any;
          resolution: any;
          deviceId: any;
          facingMode: any;
          sourceId: any;
      });
      _setEffectInProgress: boolean;
      /**
       * The ID assigned by the RTC module on instance creation.
       *
       * @type {number}
       */
      rtcId: number;
      sourceId: any;
      sourceType: any;
      resolution: any;
      maxEnabledResolution: any;
      _constraints: any;
      deviceId: any;
      /**
       * The <tt>Promise</tt> which represents the progress of a previously
       * queued/scheduled {@link _setMuted} (from the point of view of
       * {@link _queueSetMuted}).
       *
       * @private
       * @type {Promise}
       */
      private _prevSetMuted;
      /**
       * The facing mode of the camera from which this JitsiLocalTrack
       * instance was obtained.
       *
       * @private
       * @type {CameraFacingMode|undefined}
       */
      private _facingMode;
      _trackEnded: boolean;
      /**
       * Indicates whether data has been sent or not.
       */
      _hasSentData: boolean;
      /**
       * Used only for detection of audio problems. We want to check only once
       * whether the track is sending data ot not. This flag is set to false
       * after the check.
       */
      _testDataSent: boolean;
      _realDeviceId: any;
      _trackMutedTS: number;
      _onDeviceListWillChange: (devices: any) => void;
      _onAudioOutputDeviceChanged: any;
      /**
       * Returns if associated MediaStreamTrack is in the 'ended' state
       *
       * @returns {boolean}
       */
      isEnded(): boolean;
      /**
       * Sets handlers to the MediaStreamTrack object that will detect camera
       * issues.
       */
      _initNoDataFromSourceHandlers(): void;
      /**
       * Returns true if no data from source events are enabled for this JitsiLocalTrack and false otherwise.
       *
       * @returns {boolean} - True if no data from source events are enabled for this JitsiLocalTrack and false otherwise.
       */
      _isNoDataFromSourceEventsEnabled(): boolean;
      /**
       * Fires NO_DATA_FROM_SOURCE event and logs it to analytics and callstats.
       */
      _fireNoDataFromSourceEvent(): void;
      /**
       * Sets real device ID by comparing track information with device
       * information. This is temporary solution until getConstraints() method
       * will be implemented in browsers.
       *
       * @param {MediaDeviceInfo[]} devices - list of devices obtained from
       * enumerateDevices() call
       */
      _setRealDeviceIdFromDeviceList(devices: MediaDeviceInfo[]): void;
      storedMSID: `${string} ${string}`;
      /**
       * Starts the effect process and returns the modified stream.
       *
       * @private
       * @param {*} effect - Represents effect instance
       * @returns {void}
       */
      private _startStreamEffect;
      _streamEffect: any;
      _originalStream: any;
      /**
       * Stops the effect process and returns the original stream.
       *
       * @private
       * @returns {void}
       */
      private _stopStreamEffect;
      /**
       * Stops the currently used effect (if there is one) and starts the passed effect (if there is one).
       *
       * @param {Object|undefined} effect - The new effect to be set.
       */
      _switchStreamEffect(effect: any | undefined): void;
      /**
       * Sets the effect and switches between the modified stream and original one.
       *
       * @param {Object} effect - Represents the effect instance to be used.
       * @returns {Promise}
       */
      setEffect(effect: any): Promise<any>;
      /**
       * Asynchronously mutes this track.
       *
       * @returns {Promise}
       */
      mute(): Promise<any>;
      /**
       * Asynchronously unmutes this track.
       *
       * @returns {Promise}
       */
      unmute(): Promise<any>;
      /**
       * Initializes a new Promise to execute {@link #_setMuted}. May be called
       * multiple times in a row and the invocations of {@link #_setMuted} and,
       * consequently, {@link #mute} and/or {@link #unmute} will be resolved in a
       * serialized fashion.
       *
       * @param {boolean} muted - The value to invoke <tt>_setMuted</tt> with.
       * @returns {Promise}
       */
      _queueSetMuted(muted: boolean): Promise<any>;
      /**
       * Mutes / unmutes this track.
       *
       * @param {boolean} muted - If <tt>true</tt>, this track will be muted;
       * otherwise, this track will be unmuted.
       * @private
       * @returns {Promise}
       */
      private _setMuted;
      /**
       * Adds stream to conference and marks it as "unmute" operation.
       *
       * @private
       * @returns {Promise}
       */
      private _addStreamToConferenceAsUnmute;
      /**
       * Removes stream from conference and marks it as "mute" operation.
       *
       * @param {Function} successCallback will be called on success
       * @param {Function} errorCallback will be called on error
       * @private
       */
      private _removeStreamFromConferenceAsMute;
      /**
       * Sends mute status for a track to conference if any.
       *
       * @param {boolean} mute - If track is muted.
       * @private
       * @returns {Promise}
       */
      private _sendMuteStatus;
      /**
       * Returns <tt>true</tt> - if the stream is muted and <tt>false</tt>
       * otherwise.
       *
       * @returns {boolean} <tt>true</tt> - if the stream is muted and
       * <tt>false</tt> otherwise.
       */
      isMuted(): boolean;
      /**
       * Sets the JitsiConference object associated with the track. This is temp
       * solution.
       *
       * @param conference the JitsiConference object
       */
      _setConference(conference: any): void;
      /**
       * Returns device id associated with track.
       *
       * @returns {string}
       */
      getDeviceId(): string;
      /**
       * Returns the participant id which owns the track.
       *
       * @returns {string} the id of the participants. It corresponds to the
       * Colibri endpoint id/MUC nickname in case of Jitsi-meet.
       */
      getParticipantId(): string;
      /**
       * Handles bytes sent statistics.
       *
       * @param {TraceablePeerConnection} tpc the source of the "bytes sent" stat
       * @param {number} bytesSent the new value
       * NOTE: used only for audio tracks to detect audio issues.
       */
      _onByteSentStatsReceived(tpc: any, bytesSent: number): void;
      /**
       * Returns facing mode for video track from camera. For other cases (e.g.
       * audio track or 'desktop' video track) returns undefined.
       *
       * @returns {CameraFacingMode|undefined}
       */
      getCameraFacingMode(): any | undefined;
      /**
       * Stops the associated MediaStream.
       */
      stopStream(): void;
      /**
       * Indicates that we are executing {@link #stopStream} i.e.
       * {@link RTCUtils#stopMediaStream} for the <tt>MediaStream</tt>
       * associated with this <tt>JitsiTrack</tt> instance.
       *
       * @private
       * @type {boolean}
       */
      private _stopStreamInProgress;
      /**
       * Switches the camera facing mode if the WebRTC implementation supports the
       * custom MediaStreamTrack._switchCamera method. Currently, the method in
       * question is implemented in react-native-webrtc only. When such a WebRTC
       * implementation is executing, the method is the preferred way to switch
       * between the front/user-facing and the back/environment-facing cameras
       * because it will likely be (as is the case of react-native-webrtc)
       * noticeably faster that creating a new MediaStreamTrack via a new
       * getUserMedia call with the switched facingMode constraint value.
       * Moreover, the approach with a new getUserMedia call may not even work:
       * WebRTC on Android and iOS is either very slow to open the camera a second
       * time or plainly freezes attempting to do that.
       */
      _switchCamera(): void;
      /**
       * Checks whether the attached MediaStream is receiving data from source or
       * not. If the stream property is null(because of mute or another reason)
       * this method will return false.
       * NOTE: This method doesn't indicate problem with the streams directly.
       * For example in case of video mute the method will return false or if the
       * user has disposed the track.
       *
       * @returns {boolean} true if the stream is receiving data and false
       * this otherwise.
       */
      isReceivingData(): boolean;
  }
  import JitsiTrack from "@lyno/lib-jitsi-meet/modules/RTC/JitsiTrack";

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/JitsiRemoteTrack' {
  /**
   * Represents a single media track (either audio or video).
   */
  export default class JitsiRemoteTrack extends JitsiTrack {
      /**
       * Creates new JitsiRemoteTrack instance.
       * @param {RTC} rtc the RTC service instance.
       * @param {JitsiConference} conference the conference to which this track
       *        belongs to
       * @param {string} ownerEndpointId the endpoint ID of the track owner
       * @param {MediaStream} stream WebRTC MediaStream, parent of the track
       * @param {MediaStreamTrack} track underlying WebRTC MediaStreamTrack for
       *        the new JitsiRemoteTrack
       * @param {MediaType} mediaType the type of the media
       * @param {VideoType} videoType the type of the video if applicable
       * @param {number} ssrc the SSRC number of the Media Stream
       * @param {boolean} muted the initial muted state
       * @param {boolean} isP2P indicates whether or not this track belongs to a
       * P2P session
       * @throws {TypeError} if <tt>ssrc</tt> is not a number.
       * @constructor
       */
      constructor(rtc: any, conference: any, ownerEndpointId: string, stream: MediaStream, track: MediaStreamTrack, mediaType: any, videoType: any, ssrc: number, muted: boolean, isP2P: boolean);
      rtc: any;
      ssrc: number;
      ownerEndpointId: string;
      muted: boolean;
      isP2P: boolean;
      hasBeenMuted: boolean;
      _containerHandlers: {};
      /**
       * Attaches the track handlers.
       *
       * @returns {void}
       */
      _bindTrackHandlers(): void;
      /**
       * Callback invoked when the track is muted. Emits an event notifying
       * listeners of the mute event.
       *
       * @private
       * @returns {void}
       */
      private _onTrackMute;
      /**
       * Callback invoked when the track is unmuted. Emits an event notifying
       * listeners of the mute event.
       *
       * @private
       * @returns {void}
       */
      private _onTrackUnmute;
      /**
       * Sets current muted status and fires an events for the change.
       * @param value the muted status.
       */
      setMute(value: any): void;
      /**
       * Returns the current muted status of the track.
       * @returns {boolean|*|JitsiRemoteTrack.muted} <tt>true</tt> if the track is
       * muted and <tt>false</tt> otherwise.
       */
      isMuted(): boolean | any | any;
      /**
       * Returns the participant id which owns the track.
       *
       * @returns {string} the id of the participants. It corresponds to the
       * Colibri endpoint id/MUC nickname in case of Jitsi-meet.
       */
      getParticipantId(): string;
      /**
       * Returns the synchronization source identifier (SSRC) of this remote
       * track.
       *
       * @returns {number} the SSRC of this remote track.
       */
      getSSRC(): number;
      /**
       * Changes the video type of the track.
       *
       * @param {string} type - The new video type("camera", "desktop").
       */
      _setVideoType(type: string): void;
      /**
       * Handles track play events.
       */
      _playCallback(): void;
      /**
       * An event handler for events triggered by the attached container.
       *
       * @param {string} type - The type of the event.
       */
      _containerEventHandler(type: string): void;
      /**
       * Returns a string with a description of the current status of the track.
       *
       * @returns {string}
       */
      _getStatus(): string;
  }
  import JitsiTrack from "@lyno/lib-jitsi-meet/modules/RTC/JitsiTrack";

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/JitsiTrack' {
  /**
   * Represents a single media track (either audio or video).
   */
  export default class JitsiTrack {
      /**
       * Represents a single media track (either audio or video).
       * @constructor
       * @param conference the rtc instance
       * @param stream the WebRTC MediaStream instance
       * @param track the WebRTC MediaStreamTrack instance, must be part of
       * the given <tt>stream</tt>.
       * @param streamInactiveHandler the function that will handle
       *        onended/oninactive events of the stream.
       * @param trackMediaType the media type of the JitsiTrack
       * @param videoType the VideoType for this track if any
       */
      constructor(conference: any, stream: any, track: any, streamInactiveHandler: any, trackMediaType: any, videoType: any);
      addEventListener: any;
      removeEventListener: any;
      off: any;
      /**
       * Array with the HTML elements that are displaying the streams.
       * @type {Array}
       */
      containers: any[];
      conference: any;
      audioLevel: number;
      type: any;
      track: any;
      videoType: any;
      handlers: Map<any, any>;
      /**
       * Indicates whether this JitsiTrack has been disposed. If true, this
       * JitsiTrack is to be considered unusable and operations involving it
       * are to fail (e.g. {@link JitsiConference#addTrack(JitsiTrack)},
       * {@link JitsiConference#removeTrack(JitsiTrack)}).
       * @type {boolean}
       */
      disposed: boolean;
      /**
       * The inactive handler which will be triggered when the underlying
       * <tt>MediaStream</tt> ends.
       *
       * @private
       * @type {Function}
       */
      private _streamInactiveHandler;
      /**
       * Adds onended/oninactive handler to a MediaStream or a MediaStreamTrack.
       * Firefox doesn't fire a inactive event on the MediaStream, instead it fires
       * a onended event on the MediaStreamTrack.
       * @param {Function} handler the handler
       */
      _addMediaStreamInactiveHandler(handler: Function): void;
      /**
       * Sets handler to the WebRTC MediaStream or MediaStreamTrack object
       * depending on the passed type.
       * @param {string} type the type of the handler that is going to be set
       * @param {Function} handler the handler.
       */
      _setHandler(type: string, handler: Function): void;
      /**
       * Unregisters all event handlers bound to the underlying media stream/track
       * @private
       */
      private _unregisterHandlers;
      /**
       * Sets the stream property of JitsiTrack object and sets all stored
       * handlers to it.
       *
       * @param {MediaStream} stream the new stream.
       * @protected
       */
      protected _setStream(stream: MediaStream): void;
      stream: any;
      /**
       * Returns the type (audio or video) of this track.
       */
      getType(): any;
      /**
       * Check if this is an audio track.
       */
      isAudioTrack(): boolean;
      /**
       * Checks whether the underlying WebRTC <tt>MediaStreamTrack</tt> is muted
       * according to it's 'muted' field status.
       * @return {boolean} <tt>true</tt> if the underlying
       * <tt>MediaStreamTrack</tt> is muted or <tt>false</tt> otherwise.
       */
      isWebRTCTrackMuted(): boolean;
      /**
       * Check if this is a video track.
       */
      isVideoTrack(): boolean;
      /**
       * Checks whether this is a local track.
       * @abstract
       * @return {boolean} 'true' if it's a local track or 'false' otherwise.
       */
      isLocal(): boolean;
      /**
       * Check whether this is a local audio track.
       *
       * @return {boolean} -  true if track represents a local audio track, false otherwise.
       */
      isLocalAudioTrack(): boolean;
      /**
       * Returns the WebRTC MediaStream instance.
       */
      getOriginalStream(): any;
      /**
       * Returns the ID of the underlying WebRTC Media Stream(if any)
       * @returns {String|null}
       */
      getStreamId(): string | null;
      /**
       * Return the underlying WebRTC MediaStreamTrack
       * @returns {MediaStreamTrack}
       */
      getTrack(): MediaStreamTrack;
      /**
       * Return the underlying WebRTC MediaStreamTrack label
       * @returns {string}
       */
      getTrackLabel(): string;
      /**
       * Returns the ID of the underlying WebRTC MediaStreamTrack(if any)
       * @returns {String|null}
       */
      getTrackId(): string | null;
      /**
       * Return meaningful usage label for this track depending on it's media and
       * eventual video type.
       * @returns {string}
       */
      getUsageLabel(): string;
      /**
       * Eventually will trigger RTCEvents.TRACK_ATTACHED event.
       * @param container the video/audio container to which this stream is
       *        attached and for which event will be fired.
       * @private
       */
      private _maybeFireTrackAttached;
      /**
       * Attaches the MediaStream of this track to an HTML container.
       * Adds the container to the list of containers that are displaying the
       * track.
       *
       * @param container the HTML container which can be 'video' or 'audio'
       * element.
       *
       * @returns {void}
       */
      attach(container: any): void;
      /**
       * Removes this JitsiTrack from the passed HTML container.
       *
       * @param container the HTML container to detach from this JitsiTrack. If
       * <tt>null</tt> or <tt>undefined</tt>, all containers are removed. A
       * container can be a 'video', 'audio' or 'object' HTML element instance to
       * which this JitsiTrack is currently attached.
       */
      detach(container: any): void;
      /**
       * Called when the track has been attached to a new container.
       *
       * @param {HTMLElement} container the HTML container which can be 'video' or
       * 'audio' element.
       * @private
       */
      private _onTrackAttach;
      /**
       * Called when the track has been detached from a container.
       *
       * @param {HTMLElement} container the HTML container which can be 'video' or
       * 'audio' element.
       * @private
       */
      private _onTrackDetach;
      /**
       * Attach time to first media tracker only if there is conference and only
       * for the first element.
       *
       * @param {HTMLElement} container the HTML container which can be 'video' or
       * 'audio' element.
       * @private
       */
      private _attachTTFMTracker;
      /**
       * Removes attached event listeners.
       *
       * @returns {Promise}
       */
      dispose(): Promise<any>;
      /**
       * Returns true if this is a video track and the source of the video is a
       * screen capture as opposed to a camera.
       */
      isScreenSharing(): void;
      /**
       * Returns id of the track.
       * @returns {string|null} id of the track or null if this is fake track.
       */
      getId(): string | null;
      /**
       * Checks whether the MediaStream is active/not ended.
       * When there is no check for active we don't have information and so
       * will return that stream is active (in case of FF).
       * @returns {boolean} whether MediaStream is active.
       */
      isActive(): boolean;
      /**
       * Sets the audio level for the stream
       * @param {number} audioLevel value between 0 and 1
       * @param {TraceablePeerConnection} [tpc] the peerconnection instance which
       * is source for the audio level. It can be <tt>undefined</tt> for
       * a local track if the audio level was measured outside of the
       * peerconnection (see /modules/statistics/LocalStatsCollector.js).
       */
      setAudioLevel(audioLevel: number, tpc?: any): void;
      /**
       * Returns the msid of the stream attached to the JitsiTrack object or null
       * if no stream is attached.
       */
      getMSID(): `${string} ${string}`;
      /**
       * Sets new audio output device for track's DOM elements. Video tracks are
       * ignored.
       * @param {string} audioOutputDeviceId - id of 'audiooutput' device from
       *      navigator.mediaDevices.enumerateDevices(), '' for default device
       * @emits JitsiTrackEvents.TRACK_AUDIO_OUTPUT_CHANGED
       * @returns {Promise}
       */
      setAudioOutput(audioOutputDeviceId: string): Promise<any>;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/LocalSdpMunger' {
  /**
   * Fakes local SDP exposed to {@link JingleSessionPC} through the local
   * description getter. Modifies the SDP, so that it will contain muted local
   * video tracks description, even though their underlying {MediaStreamTrack}s
   * are no longer in the WebRTC peerconnection. That prevents from SSRC updates
   * being sent to Jicofo/remote peer and prevents sRD/sLD cycle on the remote
   * side.
   */
  export default class LocalSdpMunger {
      /**
       * Creates new <tt>LocalSdpMunger</tt> instance.
       *
       * @param {TraceablePeerConnection} tpc
       */
      constructor(tpc: any);
      tpc: any;
      /**
       * Makes sure that muted local video tracks associated with the parent
       * {@link TraceablePeerConnection} are described in the local SDP. It's done
       * in order to prevent from sending 'source-remove'/'source-add' Jingle
       * notifications when local video track is muted (<tt>MediaStream</tt> is
       * removed from the peerconnection).
       *
       * NOTE 1 video track is assumed
       *
       * @param {SdpTransformWrap} transformer the transformer instance which will
       * be used to process the SDP.
       * @return {boolean} <tt>true</tt> if there were any modifications to
       * the SDP wrapped by <tt>transformer</tt>.
       * @private
       */
      private _addMutedLocalVideoTracksToSDP;
      /**
       * Modifies 'cname', 'msid', 'label' and 'mslabel' by appending
       * the id of {@link LocalSdpMunger#tpc} at the end, preceding by a dash
       * sign.
       *
       * @param {MLineWrap} mediaSection - The media part (audio or video) of the
       * session description which will be modified in place.
       * @returns {void}
       * @private
       */
      private _transformMediaIdentifiers;
      /**
       * Maybe modifies local description to fake local video tracks SDP when
       * those are muted.
       *
       * @param {object} desc the WebRTC SDP object instance for the local
       * description.
       * @returns {RTCSessionDescription}
       */
      maybeAddMutedLocalVideoTracksToSDP(desc: object): RTCSessionDescription;
      /**
       * This transformation will make sure that stream identifiers are unique
       * across all of the local PeerConnections even if the same stream is used
       * by multiple instances at the same time.
       * Each PeerConnection assigns different SSRCs to the same local
       * MediaStream, but the MSID remains the same as it's used to identify
       * the stream by the WebRTC backend. The transformation will append
       * {@link TraceablePeerConnection#id} at the end of each stream's identifier
       * ("cname", "msid", "label" and "mslabel").
       *
       * @param {RTCSessionDescription} sessionDesc - The local session
       * description (this instance remains unchanged).
       * @return {RTCSessionDescription} - Transformed local session description
       * (a modified copy of the one given as the input).
       */
      transformStreamIdentifiers(sessionDesc: RTCSessionDescription): RTCSessionDescription;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/MockClasses' {
  /**
   * Mock {@link TraceablePeerConnection} - add things as needed, but only things useful for all tests.
   */
  export class MockPeerConnection {
      /**
       * {@link TraceablePeerConnection.localDescription}.
       *
       * @returns {Object}
       */
      get localDescription(): any;
      /**
       * {@link TraceablePeerConnection.remoteDescription}.
       *
       * @returns {Object}
       */
      get remoteDescription(): any;
      /**
       * {@link TraceablePeerConnection.createAnswer}.
       *
       * @returns {Promise<Object>}
       */
      createAnswer(): Promise<any>;
      /**
       * {@link TraceablePeerConnection.setLocalDescription}.
       *
       * @returns {Promise<void>}
       */
      setLocalDescription(): Promise<void>;
      /**
       * {@link TraceablePeerConnection.setRemoteDescription}.
       *
       * @returns {Promise<void>}
       */
      setRemoteDescription(): Promise<void>;
      /**
       * {@link TraceablePeerConnection.setSenderVideoConstraint}.
       */
      setSenderVideoConstraint(): void;
      /**
       * {@link TraceablePeerConnection.setVideoTransferActive}.
       */
      setVideoTransferActive(): boolean;
  }
  /**
   * Mock {@link RTC} - add things as needed, but only things useful for all tests.
   */
  export class MockRTC {
      /**
       * {@link RTC.createPeerConnection}.
       *
       * @returns {MockPeerConnection}
       */
      createPeerConnection(): MockPeerConnection;
      pc: MockPeerConnection;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/RTC' {
  /**
   *
   */
  export default class RTC extends Listenable {
      /**
       * Exposes the private helper for converting a WebRTC MediaStream to a
       * JitsiLocalTrack.
       *
       * @param {Array<Object>} tracksInfo
       * @returns {Array<JitsiLocalTrack>}
       */
      static newCreateLocalTracks(tracksInfo: Array<any>): Array<JitsiLocalTrack>;
      /**
       * Creates the local MediaStreams.
       * @param {object} [options] Optional parameters.
       * @param {array} options.devices The devices that will be requested.
       * @param {string} options.resolution Resolution constraints.
       * @param {string} options.cameraDeviceId
       * @param {string} options.micDeviceId
       * @returns {*} Promise object that will receive the new JitsiTracks
       */
      static obtainAudioAndVideoPermissions(options?: {
          devices: any[];
          resolution: string;
          cameraDeviceId: string;
          micDeviceId: string;
      }): any;
      /**
       *
       * @param eventType
       * @param listener
       */
      static addListener(eventType: any, listener: any): void;
      /**
       *
       * @param eventType
       * @param listener
       */
      static removeListener(eventType: any, listener: any): void;
      /**
       *
       * @param options
       */
      static init(options?: {}): void;
      /**
       *
       */
      static getPCConstraints(isP2P: any): any;
      /**
       *
       * @param elSelector
       * @param stream
       */
      static attachMediaStream(elSelector: any, stream: any): any;
      /**
       * Returns the id of the given stream.
       * @param {MediaStream} stream
       */
      static getStreamID(stream: MediaStream): any;
      /**
       * Returns the id of the given track.
       * @param {MediaStreamTrack} track
       */
      static getTrackID(track: MediaStreamTrack): any;
      /**
       * Returns true if retrieving the list of input devices is supported
       * and false if not.
       */
      static isDeviceListAvailable(): boolean;
      /**
       * Returns true if changing the input (camera / microphone) or output
       * (audio) device is supported and false if not.
       * @param {string} [deviceType] Type of device to change. Default is
       *      undefined or 'input', 'output' - for audio output device change.
       * @returns {boolean} true if available, false otherwise.
       */
      static isDeviceChangeAvailable(deviceType?: string): boolean;
      /**
       * Returns whether the current execution environment supports WebRTC (for
       * use within this library).
       *
       * @returns {boolean} {@code true} if WebRTC is supported in the current
       * execution environment (for use within this library); {@code false},
       * otherwise.
       */
      static isWebRtcSupported(): boolean;
      /**
       * Returns currently used audio output device id, '' stands for default
       * device
       * @returns {string}
       */
      static getAudioOutputDevice(): string;
      /**
       * Returns list of available media devices if its obtained, otherwise an
       * empty array is returned/
       * @returns {array} list of available media devices.
       */
      static getCurrentlyAvailableMediaDevices(): any[];
      /**
       * Returns event data for device to be reported to stats.
       * @returns {MediaDeviceInfo} device.
       */
      static getEventDataForActiveDevice(device: any): MediaDeviceInfo;
      /**
       * Sets current audio output device.
       * @param {string} deviceId Id of 'audiooutput' device from
       *      navigator.mediaDevices.enumerateDevices().
       * @returns {Promise} resolves when audio output is changed, is rejected
       *      otherwise
       */
      static setAudioOutputDevice(deviceId: string): Promise<any>;
      /**
       * Returns <tt>true<tt/> if given WebRTC MediaStream is considered a valid
       * "user" stream which means that it's not a "receive only" stream nor a
       * "mixed" JVB stream.
       *
       * Clients that implement Unified Plan, such as Firefox use recvonly
       * "streams/channels/tracks" for receiving remote stream/tracks, as opposed
       * to Plan B where there are only 3 channels: audio, video and data.
       *
       * @param {MediaStream} stream The WebRTC MediaStream instance.
       * @returns {boolean}
       */
      static isUserStream(stream: MediaStream): boolean;
      /**
       * Returns <tt>true<tt/> if a WebRTC MediaStream identified by given stream
       * ID is considered a valid "user" stream which means that it's not a
       * "receive only" stream nor a "mixed" JVB stream.
       *
       * Clients that implement Unified Plan, such as Firefox use recvonly
       * "streams/channels/tracks" for receiving remote stream/tracks, as opposed
       * to Plan B where there are only 3 channels: audio, video and data.
       *
       * @param {string} streamId The id of WebRTC MediaStream.
       * @returns {boolean}
       */
      static isUserStreamById(streamId: string): boolean;
      /**
       * Allows to receive list of available cameras/microphones.
       * @param {function} callback Would receive array of devices as an
       *      argument.
       */
      static enumerateDevices(callback: Function): void;
      /**
       * A method to handle stopping of the stream.
       * One point to handle the differences in various implementations.
       * @param {MediaStream} mediaStream MediaStream object to stop.
       */
      static stopMediaStream(mediaStream: MediaStream): void;
      /**
       * Returns whether the desktop sharing is enabled or not.
       * @returns {boolean}
       */
      static isDesktopSharingEnabled(): boolean;
      /**
       *
       * @param conference
       * @param options
       */
      constructor(conference: any, options?: {});
      conference: any;
      /**
       * A map of active <tt>TraceablePeerConnection</tt>.
       * @type {Map.<number, TraceablePeerConnection>}
       */
      peerConnections: Map<number, TraceablePeerConnection>;
      localTracks: any[];
      options: {};
      _channel: BridgeChannel;
      /**
       * The value specified to the last invocation of setLastN before the
       * channel completed opening. If non-null, the value will be sent
       * through a channel (once) as soon as it opens and will then be
       * discarded.
       * @private
       * @type {number}
       */
      private _lastN;
      /**
       * Defines the last N endpoints list. It can be null or an array once
       * initialised with a channel last N event.
       * @type {Array<string>|null}
       * @private
       */
      private _lastNEndpoints;
      _senderVideoConstraints: {};
      /**
       * The number representing the maximum video height the local client
       * should receive from the bridge.
       *
       * @type {number|undefined}
       * @private
       */
      private _maxFrameHeight;
      /**
       * The endpoint ID of currently pinned participant or <tt>null</tt> if
       * no user is pinned.
       * @type {string|null}
       * @private
       */
      private _pinnedEndpoint;
      /**
       * The endpoint IDs of currently selected participants.
       *
       * @type {Array}
       * @private
       */
      private _selectedEndpoints;
      _lastNChangeListener: any;
      /**
       * Callback invoked when the list of known audio and video devices has
       * been updated. Attempts to update the known available audio output
       * devices.
       *
       * @private
       * @returns {void}
       */
      private _onDeviceListChanged;
      /**
       * Updates the target audio output device for all remote audio tracks.
       *
       * @param {string} deviceId - The device id of the audio ouput device to
       * use for all remote tracks.
       * @private
       * @returns {void}
       */
      private _updateAudioOutputForAudioTracks;
      /**
       * Removes any listeners and stored state from this {@code RTC} instance.
       *
       * @returns {void}
       */
      destroy(): void;
      /**
       * Initializes the bridge channel of this instance.
       * At least one of both, peerconnection or wsUrl parameters, must be
       * given.
       * @param {RTCPeerConnection} [peerconnection] WebRTC peer connection
       * instance.
       * @param {string} [wsUrl] WebSocket URL.
       */
      initializeBridgeChannel(peerconnection?: RTCPeerConnection, wsUrl?: string): void;
      _channelOpenListener: any;
      /**
       * Notifies this instance that the sender video constraints signaled from the bridge have changed.
       *
       * @param {Object} senderVideoConstraints the sender video constraints from the bridge.
       * @private
       */
      private _senderVideoConstraintsChanged;
      /**
       * Receives events when Last N had changed.
       * @param {array} lastNEndpoints The new Last N endpoints.
       * @private
       */
      private _onLastNChanged;
      /**
       * Should be called when current media session ends and after the
       * PeerConnection has been closed using PeerConnection.close() method.
       */
      onCallEnded(): void;
      /**
       * Sets the maximum video size the local participant should receive from
       * remote participants. Will cache the value and send it through the channel
       * once it is created.
       *
       * @param {number} maxFrameHeightPixels the maximum frame height, in pixels,
       * this receiver is willing to receive.
       * @returns {void}
       */
      setReceiverVideoConstraint(maxFrameHeight: any): void;
      /**
       * Elects the participants with the given ids to be the selected
       * participants in order to always receive video for this participant (even
       * when last n is enabled). If there is no channel we store it and send it
       * through the channel once it is created.
       *
       * @param {Array<string>} ids - The user ids.
       * @throws NetworkError or InvalidStateError or Error if the operation
       * fails.
       * @returns {void}
       */
      selectEndpoints(ids: Array<string>): void;
      /**
       * Elects the participant with the given id to be the pinned participant in
       * order to always receive video for this participant (even when last n is
       * enabled).
       * @param {stirng} id The user id.
       * @throws NetworkError or InvalidStateError or Error if the operation
       * fails.
       */
      pinEndpoint(id: any): void;
      /**
       * Creates new <tt>TraceablePeerConnection</tt>
       * @param {SignalingLayer} signaling The signaling layer that will
       *      provide information about the media or participants which is not
       *      carried over SDP.
       * @param {object} iceConfig An object describing the ICE config like
       *      defined in the WebRTC specification.
       * @param {boolean} isP2P Indicates whether or not the new TPC will be used
       *      in a peer to peer type of session.
       * @param {object} options The config options.
       * @param {boolean} options.enableInsertableStreams - Set to true when the insertable streams constraints is to be
       * enabled on the PeerConnection.
       * @param {boolean} options.disableSimulcast If set to 'true' will disable
       *      the simulcast.
       * @param {boolean} options.disableRtx If set to 'true' will disable the
       *      RTX.
       * @param {boolean} options.disableH264 If set to 'true' H264 will be
       *      disabled by removing it from the SDP.
       * @param {boolean} options.preferH264 If set to 'true' H264 will be
       *      preferred over other video codecs.
       * @param {boolean} options.startSilent If set to 'true' no audio will be sent or received.
       * @return {TraceablePeerConnection}
       */
      createPeerConnection(signaling: any, iceConfig: object, isP2P: boolean, options: {
          enableInsertableStreams: boolean;
          disableSimulcast: boolean;
          disableRtx: boolean;
          disableH264: boolean;
          preferH264: boolean;
          startSilent: boolean;
      }): TraceablePeerConnection;
      /**
       * Removed given peer connection from this RTC module instance.
       * @param {TraceablePeerConnection} traceablePeerConnection
       * @return {boolean} <tt>true</tt> if the given peer connection was removed
       * successfully or <tt>false</tt> if there was no peer connection mapped in
       * this RTC instance.
       */
      _removePeerConnection(traceablePeerConnection: TraceablePeerConnection): boolean;
      /**
       *
       * @param track
       */
      addLocalTrack(track: any): void;
      /**
       * Returns the current value for "lastN" - the amount of videos are going
       * to be delivered. When set to -1 for unlimited or all available videos.
       * @return {number}
       */
      getLastN(): number;
      /**
       * @return {Object} The sender video constraints signaled from the brridge.
       */
      getSenderVideoConstraints(): any;
      /**
       * Get local video track.
       * @returns {JitsiLocalTrack|undefined}
       */
      getLocalVideoTrack(): JitsiLocalTrack | undefined;
      /**
       * Get local audio track.
       * @returns {JitsiLocalTrack|undefined}
       */
      getLocalAudioTrack(): JitsiLocalTrack | undefined;
      /**
       * Returns the local tracks of the given media type, or all local tracks if
       * no specific type is given.
       * @param {MediaType} [mediaType] Optional media type filter.
       * (audio or video).
       */
      getLocalTracks(mediaType?: typeof MediaType): any[];
      /**
       * Obtains all remote tracks currently known to this RTC module instance.
       * @param {MediaType} [mediaType] The remote tracks will be filtered
       *      by their media type if this argument is specified.
       * @return {Array<JitsiRemoteTrack>}
       */
      getRemoteTracks(mediaType?: typeof MediaType): Array<any>;
      /**
       * Set mute for all local audio streams attached to the conference.
       * @param value The mute value.
       * @returns {Promise}
       */
      setAudioMute(value: any): Promise<any>;
      /**
       *
       * @param track
       */
      removeLocalTrack(track: any): void;
      /**
       * Removes all JitsiRemoteTracks associated with given MUC nickname
       * (resource part of the JID). Returns array of removed tracks.
       *
       * @param {string} Owner The resource part of the MUC JID.
       * @returns {JitsiRemoteTrack[]}
       */
      removeRemoteTracks(owner: any): any[];
      /**
       * Closes the currently opened bridge channel.
       */
      closeBridgeChannel(): void;
      /**
       *
       * @param {TraceablePeerConnection} tpc
       * @param {number} ssrc
       * @param {number} audioLevel
       * @param {boolean} isLocal
       */
      setAudioLevel(tpc: TraceablePeerConnection, ssrc: number, audioLevel: number, isLocal: boolean): void;
      /**
       * Sends message via the bridge channel.
       * @param {string} to The id of the endpoint that should receive the
       *      message. If "" the message will be sent to all participants.
       * @param {object} payload The payload of the message.
       * @throws NetworkError or InvalidStateError or Error if the operation
       * fails or there is no data channel created.
       */
      sendChannelMessage(to: string, payload: object): void;
      /**
       * Selects a new value for "lastN". The requested amount of videos are going
       * to be delivered after the value is in effect. Set to -1 for unlimited or
       * all available videos.
       * @param {number} value the new value for lastN.
       */
      setLastN(value: number): void;
      /**
       * Indicates if the endpoint id is currently included in the last N.
       * @param {string} id The endpoint id that we check for last N.
       * @returns {boolean} true if the endpoint id is in the last N or if we
       * don't have bridge channel support, otherwise we return false.
       */
      isInLastN(id: string): boolean;
  }
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";
  import TraceablePeerConnection from "@lyno/lib-jitsi-meet/modules/RTC/TraceablePeerConnection";
  import BridgeChannel from "@lyno/lib-jitsi-meet/modules/RTC/BridgeChannel";
  import JitsiLocalTrack from "@lyno/lib-jitsi-meet/modules/RTC/JitsiLocalTrack";
  import * as MediaType from "@lyno/lib-jitsi-meet/service/RTC/MediaType";

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/RTCUtils' {
  export default rtcUtils;
  const rtcUtils: RTCUtils;
  /**
   *
   */
  class RTCUtils extends Listenable {
      /**
       *
       */
      constructor();
      /**
       * Depending on the browser, sets difference instance methods for
       * interacting with user media and adds methods to native WebRTC-related
       * objects. Also creates an instance variable for peer connection
       * constraints.
       *
       * @param {Object} options
       * @returns {void}
       */
      init(options?: any): void;
      enumerateDevices: Function;
      RTCPeerConnectionType: {
          new (configuration?: RTCConfiguration): RTCPeerConnection;
          prototype: RTCPeerConnection;
          generateCertificate(keygenAlgorithm: AlgorithmIdentifier): Promise<RTCCertificate>;
          getDefaultIceServers(): RTCIceServer[];
      };
      attachMediaStream: Function;
      getStreamID: ({ id }: {
          id: any;
      }) => any;
      getTrackID: ({ id }: {
          id: any;
      }) => any;
      /**
       * Creates instance objects for peer connection constraints both for p2p
       * and outside of p2p.
       */
      _initPCConstraints(): void;
      pcConstraints: {
          optional?: undefined;
      } | {
          optional: ({
              googHighStartBitrate: number;
              googPayloadPadding?: undefined;
              googScreencastMinBitrate?: undefined;
              googCpuOveruseDetection?: undefined;
              googCpuOveruseEncodeUsage?: undefined;
              googCpuUnderuseThreshold?: undefined;
              googCpuOveruseThreshold?: undefined;
          } | {
              googPayloadPadding: boolean;
              googHighStartBitrate?: undefined;
              googScreencastMinBitrate?: undefined;
              googCpuOveruseDetection?: undefined;
              googCpuOveruseEncodeUsage?: undefined;
              googCpuUnderuseThreshold?: undefined;
              googCpuOveruseThreshold?: undefined;
          } | {
              googScreencastMinBitrate: number;
              googHighStartBitrate?: undefined;
              googPayloadPadding?: undefined;
              googCpuOveruseDetection?: undefined;
              googCpuOveruseEncodeUsage?: undefined;
              googCpuUnderuseThreshold?: undefined;
              googCpuOveruseThreshold?: undefined;
          } | {
              googCpuOveruseDetection: boolean;
              googHighStartBitrate?: undefined;
              googPayloadPadding?: undefined;
              googScreencastMinBitrate?: undefined;
              googCpuOveruseEncodeUsage?: undefined;
              googCpuUnderuseThreshold?: undefined;
              googCpuOveruseThreshold?: undefined;
          } | {
              googCpuOveruseEncodeUsage: boolean;
              googHighStartBitrate?: undefined;
              googPayloadPadding?: undefined;
              googScreencastMinBitrate?: undefined;
              googCpuOveruseDetection?: undefined;
              googCpuUnderuseThreshold?: undefined;
              googCpuOveruseThreshold?: undefined;
          } | {
              googCpuUnderuseThreshold: number;
              googHighStartBitrate?: undefined;
              googPayloadPadding?: undefined;
              googScreencastMinBitrate?: undefined;
              googCpuOveruseDetection?: undefined;
              googCpuOveruseEncodeUsage?: undefined;
              googCpuOveruseThreshold?: undefined;
          } | {
              googCpuOveruseThreshold: number;
              googHighStartBitrate?: undefined;
              googPayloadPadding?: undefined;
              googScreencastMinBitrate?: undefined;
              googCpuOveruseDetection?: undefined;
              googCpuOveruseEncodeUsage?: undefined;
              googCpuUnderuseThreshold?: undefined;
          })[];
      };
      p2pPcConstraints: any;
      /**
      * @param {string[]} um required user media types
      * @param {Object} [options] optional parameters
      * @param {string} options.resolution
      * @param {number} options.bandwidth
      * @param {number} options.fps
      * @param {string} options.desktopStream
      * @param {string} options.cameraDeviceId
      * @param {string} options.micDeviceId
      * @param {Object} options.frameRate - used only for dekstop sharing.
      * @param {Object} options.frameRate.min - Minimum fps
      * @param {Object} options.frameRate.max - Maximum fps
      * @param {bool}   options.screenShareAudio - Used by electron clients to
      * enable system audio screen sharing.
      * @returns {Promise} Returns a media stream on success or a JitsiTrackError
      * on failure.
      **/
      getUserMediaWithConstraints(um: string[], options?: {
          resolution: string;
          bandwidth: number;
          fps: number;
          desktopStream: string;
          cameraDeviceId: string;
          micDeviceId: string;
          frameRate: {
              min: any;
              max: any;
          };
          screenShareAudio: any;
      }): Promise<any>;
      /**
       * Acquires a media stream via getUserMedia that
       * matches the given constraints
       *
       * @param {array} umDevices which devices to acquire (e.g. audio, video)
       * @param {Object} constraints - Stream specifications to use.
       * @returns {Promise}
       */
      _newGetUserMediaWithConstraints(umDevices: any[], constraints?: any): Promise<any>;
      /**
       * Acquire a display stream via the screenObtainer. This requires extra
       * logic compared to use screenObtainer versus normal device capture logic
       * in RTCUtils#_newGetUserMediaWithConstraints.
       *
       * @param {Object} options
       * @param {string[]} options.desktopSharingSources
       * @param {Object} options.desktopSharingFrameRate
       * @param {Object} options.desktopSharingFrameRate.min - Minimum fps
       * @param {Object} options.desktopSharingFrameRate.max - Maximum fps
       * @returns {Promise} A promise which will be resolved with an object which
       * contains the acquired display stream. If desktop sharing is not supported
       * then a rejected promise will be returned.
       */
      _newGetDesktopMedia(options: {
          desktopSharingSources: string[];
          desktopSharingFrameRate: {
              min: any;
              max: any;
          };
      }): Promise<any>;
      /**
       * Creates the local MediaStreams.
       * @param {Object} [options] optional parameters
       * @param {Array} options.devices the devices that will be requested
       * @param {string} options.resolution resolution constraints
       * @param {string} options.cameraDeviceId
       * @param {string} options.micDeviceId
       * @param {Object} options.desktopSharingFrameRate
       * @param {Object} options.desktopSharingFrameRate.min - Minimum fps
       * @param {Object} options.desktopSharingFrameRate.max - Maximum fps
       * @returns {*} Promise object that will receive the new JitsiTracks
       */
      obtainAudioAndVideoPermissions(options?: {
          devices: any[];
          resolution: string;
          cameraDeviceId: string;
          micDeviceId: string;
          desktopSharingFrameRate: {
              min: any;
              max: any;
          };
      }): any;
      /**
       * Performs one call to getUserMedia for audio and/or video and another call
       * for desktop.
       *
       * @param {Object} options - An object describing how the gUM request should
       * be executed. See {@link obtainAudioAndVideoPermissions} for full options.
       * @returns {*} Promise object that will receive the new JitsiTracks on
       * success or a JitsiTrackError on failure.
       */
      _getAudioAndVideoStreams(options: any): any;
      /**
       * Private utility for determining if the passed in MediaStream contains
       * tracks of the type(s) specified in the requested devices.
       *
       * @param {string[]} requestedDevices - The track types that are expected to
       * be includes in the stream.
       * @param {MediaStream} stream - The MediaStream to check if it has the
       * expected track types.
       * @returns {string[]} An array of string with the missing track types. The
       * array will be empty if all requestedDevices are found in the stream.
       */
      _getMissingTracks(requestedDevices: string[], stream: MediaStream): string[];
      /**
       * Returns an object formatted for specifying desktop sharing parameters.
       *
       * @param {Object} options - Takes in the same options object as
       * {@link obtainAudioAndVideoPermissions}.
       * @returns {Object}
       */
      _parseDesktopSharingOptions(options: any): any;
      /**
       * Gets streams from specified device types. This function intentionally
       * ignores errors for upstream to catch and handle instead.
       *
       * @param {Object} options - A hash describing what devices to get and
       * relevant constraints.
       * @param {string[]} options.devices - The types of media to capture. Valid
       * values are "desktop", "audio", and "video".
       * @param {Object} options.desktopSharingFrameRate
       * @param {Object} options.desktopSharingFrameRate.min - Minimum fps
       * @param {Object} options.desktopSharingFrameRate.max - Maximum fps
       * @param {String} options.desktopSharingSourceDevice - The device id or
       * label for a video input source that should be used for screensharing.
       * @returns {Promise} The promise, when successful, will return an array of
       * meta data for the requested device type, which includes the stream and
       * track. If an error occurs, it will be deferred to the caller for
       * handling.
       */
      newObtainAudioAndVideoPermissions(options: {
          devices: string[];
          desktopSharingFrameRate: {
              min: any;
              max: any;
          };
          desktopSharingSourceDevice: string;
      }): Promise<any>;
      /**
       * Checks whether it is possible to enumerate available cameras/microphones.
       *
       * @returns {boolean} {@code true} if the device listing is available;
       * {@code false}, otherwise.
       */
      isDeviceListAvailable(): boolean;
      /**
       * Returns true if changing the input (camera / microphone) or output
       * (audio) device is supported and false if not.
       * @params {string} [deviceType] - type of device to change. Default is
       *      undefined or 'input', 'output' - for audio output device change.
       * @returns {boolean} true if available, false otherwise.
       */
      isDeviceChangeAvailable(deviceType: any): boolean;
      /**
       * A method to handle stopping of the stream.
       * One point to handle the differences in various implementations.
       * @param mediaStream MediaStream object to stop.
       */
      stopMediaStream(mediaStream: any): void;
      /**
       * Returns whether the desktop sharing is enabled or not.
       * @returns {boolean}
       */
      isDesktopSharingEnabled(): boolean;
      /**
       * Sets current audio output device.
       * @param {string} deviceId - id of 'audiooutput' device from
       *      navigator.mediaDevices.enumerateDevices(), 'default' for default
       *      device
       * @returns {Promise} - resolves when audio output is changed, is rejected
       *      otherwise
       */
      setAudioOutputDevice(deviceId: string): Promise<any>;
      /**
       * Returns currently used audio output device id, '' stands for default
       * device
       * @returns {string}
       */
      getAudioOutputDevice(): string;
      /**
       * Returns list of available media devices if its obtained, otherwise an
       * empty array is returned/
       * @returns {Array} list of available media devices.
       */
      getCurrentlyAvailableMediaDevices(): any[];
      /**
       * Returns event data for device to be reported to stats.
       * @returns {MediaDeviceInfo} device.
       */
      getEventDataForActiveDevice(device: any): MediaDeviceInfo;
      /**
       * Configures the given PeerConnection constraints to either enable or
       * disable (according to the value of the 'enable' parameter) the
       * 'googSuspendBelowMinBitrate' option.
       * @param constraints the constraints on which to operate.
       * @param enable {boolean} whether to enable or disable the suspend video
       * option.
       */
      setSuspendVideo(constraints: any, enable: boolean): void;
  }
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/ScreenObtainer' {
  export default ScreenObtainer;
  namespace ScreenObtainer {
      const obtainStream: any;
      /**
       * Initializes the function used to obtain a screen capture
       * (this.obtainStream).
       *
       * @param {object} options
       * @param {Function} gum GUM method
       */
      function init(options: any, gum: Function): void;
      /**
       * Initializes the function used to obtain a screen capture
       * (this.obtainStream).
       *
       * @param {object} options
       * @param {Function} gum GUM method
       */
      function init(options: any, gum: Function): void;
      /**
       * Returns a method which will be used to obtain the screen sharing stream
       * (based on the browser type).
       *
       * @returns {Function}
       * @private
       */
      function _createObtainStreamMethod(): Function;
      /**
       * Returns a method which will be used to obtain the screen sharing stream
       * (based on the browser type).
       *
       * @returns {Function}
       * @private
       */
      function _createObtainStreamMethod(): Function;
      /**
       * Checks whether obtaining a screen capture is supported in the current
       * environment.
       * @returns {boolean}
       */
      function isSupported(): boolean;
      /**
       * Checks whether obtaining a screen capture is supported in the current
       * environment.
       * @returns {boolean}
       */
      function isSupported(): boolean;
      /**
       * Obtains a screen capture stream on Electron.
       *
       * @param {Object} [options] - Screen sharing options.
       * @param {Array<string>} [options.desktopSharingSources] - Array with the
       * sources that have to be displayed in the desktop picker window ('screen',
       * 'window', etc.).
       * @param onSuccess - Success callback.
       * @param onFailure - Failure callback.
       */
      function obtainScreenOnElectron(options?: {
          desktopSharingSources?: string[];
      }, onSuccess: any, onFailure: any): void;
      /**
       * Obtains a screen capture stream on Electron.
       *
       * @param {Object} [options] - Screen sharing options.
       * @param {Array<string>} [options.desktopSharingSources] - Array with the
       * sources that have to be displayed in the desktop picker window ('screen',
       * 'window', etc.).
       * @param onSuccess - Success callback.
       * @param onFailure - Failure callback.
       */
      function obtainScreenOnElectron(options?: {
          desktopSharingSources?: string[];
      }, onSuccess: any, onFailure: any): void;
      /**
       * Obtains a screen capture stream using getDisplayMedia.
       *
       * @param callback - The success callback.
       * @param errorCallback - The error callback.
       */
      function obtainScreenFromGetDisplayMedia(options: any, callback: any, errorCallback: any): void;
      /**
       * Obtains a screen capture stream using getDisplayMedia.
       *
       * @param callback - The success callback.
       * @param errorCallback - The error callback.
       */
      function obtainScreenFromGetDisplayMedia(options: any, callback: any, errorCallback: any): void;
      /**
       * Obtains a screen capture stream using getDisplayMedia.
       *
       * @param callback - The success callback.
       * @param errorCallback - The error callback.
       */
      function obtainScreenFromGetDisplayMediaRN(options: any, callback: any, errorCallback: any): void;
      /**
       * Obtains a screen capture stream using getDisplayMedia.
       *
       * @param callback - The success callback.
       * @param errorCallback - The error callback.
       */
      function obtainScreenFromGetDisplayMediaRN(options: any, callback: any, errorCallback: any): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/TPCUtils' {
  export const SIM_LAYER_RIDS: string[];
  /**
   * Handles track related operations on TraceablePeerConnection when browser is
   * running in unified plan mode.
   */
  export class TPCUtils {
      /**
       * Creates a new instance for a given TraceablePeerConnection
       *
       * @param peerconnection - the tpc instance for which we have utility functions.
       * @param videoBitrates - the bitrates to be configured on the video senders for
       * different resolutions both in unicast and simulcast mode.
       */
      constructor(peerconnection: any, videoBitrates: any);
      pc: any;
      videoBitrates: any;
      /**
       * The startup configuration for the stream encodings that are applicable to
       * the video stream when a new sender is created on the peerconnection. The initial
       * config takes into account the differences in browser's simulcast implementation.
       *
       * Encoding parameters:
       * active - determine the on/off state of a particular encoding.
       * maxBitrate - max. bitrate value to be applied to that particular encoding
       *  based on the encoding's resolution and config.js videoQuality settings if applicable.
       * rid - Rtp Stream ID that is configured for a particular simulcast stream.
       * scaleResolutionDownBy - the factor by which the encoding is scaled down from the
       *  original resolution of the captured video.
       */
      localStreamEncodingsConfig: {
          active: boolean;
          maxBitrate: any;
          rid: string;
          scaleResolutionDownBy: number;
      }[];
      /**
       * Ensures that the ssrcs associated with a FID ssrc-group appear in the correct order, i.e.,
       * the primary ssrc first and the secondary rtx ssrc later. This is important for unified
       * plan since we have only one FID group per media description.
       * @param {Object} description the webRTC session description instance for the remote
       * description.
       * @private
       */
      private ensureCorrectOrderOfSsrcs;
      /**
       * Obtains stream encodings that need to be configured on the given track based
       * on the track media type and the simulcast setting.
       * @param {JitsiLocalTrack} localTrack
       */
      _getStreamEncodings(localTrack: any): {
          active: boolean;
          maxBitrate: any;
          rid: string;
          scaleResolutionDownBy: number;
      }[] | {
          active: boolean;
          maxBitrate: any;
      }[] | {
          active: boolean;
      }[];
      /**
       * Takes in a *unified plan* offer and inserts the appropriate
       * parameters for adding simulcast receive support.
       * @param {Object} desc - A session description object
       * @param {String} desc.type - the type (offer/answer)
       * @param {String} desc.sdp - the sdp content
       *
       * @return {Object} A session description (same format as above) object
       * with its sdp field modified to advertise simulcast receive support
       */
      insertUnifiedPlanSimulcastReceive(desc: {
          type: string;
          sdp: string;
      }): any;
      /**
      * Adds {@link JitsiLocalTrack} to the WebRTC peerconnection for the first time.
      * @param {JitsiLocalTrack} track - track to be added to the peerconnection.
      * @param {boolean} isInitiator - boolean that indicates if the endpoint is offerer
      * in a p2p connection.
      * @returns {void}
      */
      addTrack(localTrack: any, isInitiator: boolean): void;
      /**
       * Adds a track on the RTCRtpSender as part of the unmute operation.
       * @param {JitsiLocalTrack} localTrack - track to be unmuted.
       * @returns {Promise<void>} - resolved when done.
       */
      addTrackUnmute(localTrack: any): Promise<void>;
      /**
       * Obtains the current local video track's height constraints based on the
       * initial stream encodings configuration on the sender and the resolution
       * of the current local track added to the peerconnection.
       * @param {MediaStreamTrack} localTrack local video track
       * @returns {Array[number]} an array containing the resolution heights of
       * simulcast streams configured on the video sender.
       */
      getLocalStreamHeightConstraints(localTrack: MediaStreamTrack): any[][number];
      /**
       * Removes the track from the RTCRtpSender as part of the mute operation.
       * @param {JitsiLocalTrack} localTrack - track to be removed.
       * @returns {Promise<void>} - resolved when done.
       */
      removeTrackMute(localTrack: any): Promise<void>;
      /**
       * Replaces the existing track on a RTCRtpSender with the given track.
       * @param {JitsiLocalTrack} oldTrack - existing track on the sender that needs to be removed.
       * @param {JitsiLocalTrack} newTrack - new track that needs to be added to the sender.
       * @returns {Promise<void>} - resolved when done.
       */
      replaceTrack(oldTrack: any, newTrack: any): Promise<void>;
      /**
      * Enables/disables audio transmission on the peer connection. When
      * disabled the audio transceiver direction will be set to 'inactive'
      * which means that no data will be sent nor accepted, but
      * the connection should be kept alive.
      * @param {boolean} active - true to enable audio media transmission or
      * false to disable.
      * @returns {void}
      */
      setAudioTransferActive(active: boolean): void;
      /**
       * Set the simulcast stream encoding properties on the RTCRtpSender.
       * @param {JitsiLocalTrack} track - the current track in use for which
       * the encodings are to be set.
       * @returns {Promise<void>} - resolved when done.
       */
      setEncodings(track: any): Promise<void>;
      /**
       * Enables/disables media transmission on the peerconnection by changing the direction
       * on the transceiver for the specified media type.
       * @param {String} mediaType - 'audio' or 'video'
       * @param {boolean} active - true to enable media transmission or false
       * to disable.
       * @returns {void}
       */
      setMediaTransferActive(mediaType: string, active: boolean): void;
      /**
      * Enables/disables video media transmission on the peer connection. When
      * disabled the SDP video media direction in the local SDP will be adjusted to
      * 'inactive' which means that no data will be sent nor accepted, but
      * the connection should be kept alive.
      * @param {boolean} active - true to enable video media transmission or
      * false to disable.
      * @returns {void}
      */
      setVideoTransferActive(active: boolean): void;
      /**
       * Ensures that the resolution of the stream encodings are consistent with the values
       * that were configured on the RTCRtpSender when the source was added to the peerconnection.
       * This should prevent us from overriding the default values if the browser returns
       * erroneous values when RTCRtpSender.getParameters is used for getting the encodings info.
       * @param {Object} parameters - the RTCRtpEncodingParameters obtained from the browser.
       * @returns {void}
       */
      updateEncodingsResolution(parameters: any): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/RTC/TraceablePeerConnection' {
  /**
   * Creates new instance of 'TraceablePeerConnection'.
   *
   * @param {RTC} rtc the instance of <tt>RTC</tt> service
   * @param {number} id the peer connection id assigned by the parent RTC module.
   * @param {SignalingLayer} signalingLayer the signaling layer instance
   * @param {object} iceConfig WebRTC 'PeerConnection' ICE config
   * @param {object} constraints WebRTC 'PeerConnection' constraints
   * @param {boolean} isP2P indicates whether or not the new instance will be used
   * in a peer to peer connection
   * @param {object} options <tt>TracablePeerConnection</tt> config options.
   * @param {boolean} options.disableSimulcast if set to 'true' will disable
   * the simulcast.
   * @param {boolean} options.disableRtx if set to 'true' will disable the RTX
   * @param {boolean} options.capScreenshareBitrate if set to 'true' simulcast will
   * be disabled for screenshare and a max bitrate of 500Kbps will applied on the
   * stream.
   * @param {string} options.disabledCodec the mime type of the code that should
   * not be negotiated on the peerconnection.
   * @param {boolean} options.disableH264 If set to 'true' H264 will be
   *      disabled by removing it from the SDP (deprecated)
   * @param {boolean} options.preferH264 if set to 'true' H264 will be preferred
   * over other video codecs. (deprecated)
   * @param {string} options.preferredCodec the mime type of the codec that needs
   * to be made the preferred codec for the connection.
   * @param {boolean} options.startSilent If set to 'true' no audio will be sent or received.
   *
   * FIXME: initially the purpose of TraceablePeerConnection was to be able to
   * debug the peer connection. Since many other responsibilities have been added
   * it would make sense to extract a separate class from it and come up with
   * a more suitable name.
   *
   * @constructor
   */
  export default function TraceablePeerConnection(rtc: RTC, id: number, signalingLayer: any, iceConfig: object, constraints: object, isP2P: boolean, options: {
      disableSimulcast: boolean;
      disableRtx: boolean;
      capScreenshareBitrate: boolean;
      disabledCodec: string;
      disableH264: boolean;
      preferH264: boolean;
      preferredCodec: string;
      startSilent: boolean;
  }): void;
  export default class TraceablePeerConnection {
      /**
       * Creates new instance of 'TraceablePeerConnection'.
       *
       * @param {RTC} rtc the instance of <tt>RTC</tt> service
       * @param {number} id the peer connection id assigned by the parent RTC module.
       * @param {SignalingLayer} signalingLayer the signaling layer instance
       * @param {object} iceConfig WebRTC 'PeerConnection' ICE config
       * @param {object} constraints WebRTC 'PeerConnection' constraints
       * @param {boolean} isP2P indicates whether or not the new instance will be used
       * in a peer to peer connection
       * @param {object} options <tt>TracablePeerConnection</tt> config options.
       * @param {boolean} options.disableSimulcast if set to 'true' will disable
       * the simulcast.
       * @param {boolean} options.disableRtx if set to 'true' will disable the RTX
       * @param {boolean} options.capScreenshareBitrate if set to 'true' simulcast will
       * be disabled for screenshare and a max bitrate of 500Kbps will applied on the
       * stream.
       * @param {string} options.disabledCodec the mime type of the code that should
       * not be negotiated on the peerconnection.
       * @param {boolean} options.disableH264 If set to 'true' H264 will be
       *      disabled by removing it from the SDP (deprecated)
       * @param {boolean} options.preferH264 if set to 'true' H264 will be preferred
       * over other video codecs. (deprecated)
       * @param {string} options.preferredCodec the mime type of the codec that needs
       * to be made the preferred codec for the connection.
       * @param {boolean} options.startSilent If set to 'true' no audio will be sent or received.
       *
       * FIXME: initially the purpose of TraceablePeerConnection was to be able to
       * debug the peer connection. Since many other responsibilities have been added
       * it would make sense to extract a separate class from it and come up with
       * a more suitable name.
       *
       * @constructor
       */
      constructor(rtc: RTC, id: number, signalingLayer: any, iceConfig: object, constraints: object, isP2P: boolean, options: {
          disableSimulcast: boolean;
          disableRtx: boolean;
          capScreenshareBitrate: boolean;
          disabledCodec: string;
          disableH264: boolean;
          preferH264: boolean;
          preferredCodec: string;
          startSilent: boolean;
      });
      /**
       * Indicates whether or not this peer connection instance is actively
       * sending/receiving audio media. When set to <tt>false</tt> the SDP audio
       * media direction will be adjusted to 'inactive' in order to suspend
       * the transmission.
       * @type {boolean}
       * @private
       */
      private audioTransferActive;
      /**
       * The DTMF sender instance used to send DTMF tones.
       *
       * @type {RTCDTMFSender|undefined}
       * @private
       */
      private _dtmfSender;
      /**
       * @typedef {Object} TouchToneRequest
       * @property {string} tones - The DTMF tones string as defined by
       * {@code RTCDTMFSender.insertDTMF}, 'tones' argument.
       * @property {number} duration - The amount of time in milliseconds that
       * each DTMF should last.
       * @property {string} interToneGap - The length of time in miliseconds to
       * wait between tones.
       */
      /**
       * TouchToneRequests which are waiting to be played. This queue is filled
       * if there are touch tones currently being played.
       *
       * @type {Array<TouchToneRequest>}
       * @private
       */
      private _dtmfTonesQueue;
      /**
       * Indicates whether or not this peer connection instance is actively
       * sending/receiving video media. When set to <tt>false</tt> the SDP video
       * media direction will be adjusted to 'inactive' in order to suspend
       * the transmission.
       * @type {boolean}
       * @private
       */
      private videoTransferActive;
      /**
       * The parent instance of RTC service which created this
       * <tt>TracablePeerConnection</tt>.
       * @type {RTC}
       */
      rtc: RTC;
      /**
       * The peer connection identifier assigned by the RTC module.
       * @type {number}
       */
      id: number;
      /**
       * Indicates whether or not this instance is used in a peer to peer
       * connection.
       * @type {boolean}
       */
      isP2P: boolean;
      /**
       * The map holds remote tracks associated with this peer connection.
       * It maps user's JID to media type and remote track
       * (one track per media type per user's JID).
       * @type {Map<string, Map<MediaType, JitsiRemoteTrack>>}
       */
      remoteTracks: Map<string, Map<typeof MediaType, JitsiRemoteTrack>>;
      /**
       * A map which stores local tracks mapped by {@link JitsiLocalTrack.rtcId}
       * @type {Map<number, JitsiLocalTrack>}
       */
      localTracks: Map<number, any>;
      /**
       * Keeps tracks of the WebRTC <tt>MediaStream</tt>s that have been added to
       * the underlying WebRTC PeerConnection.
       * @type {Array}
       * @private
       */
      private _addedStreams;
      /**
       * @typedef {Object} TPCGroupInfo
       * @property {string} semantics the SSRC groups semantics
       * @property {Array<number>} ssrcs group's SSRCs in order where the first
       * one is group's primary SSRC, the second one is secondary (RTX) and so
       * on...
       */
      /**
       * @typedef {Object} TPCSSRCInfo
       * @property {Array<number>} ssrcs an array which holds all track's SSRCs
       * @property {Array<TPCGroupInfo>} groups an array stores all track's SSRC
       * groups
       */
      /**
       * Holds the info about local track's SSRCs mapped per their
       * {@link JitsiLocalTrack.rtcId}
       * @type {Map<number, TPCSSRCInfo>}
       */
      localSSRCs: Map<number, TPCSSRCInfo>;
      /**
       * The local ICE username fragment for this session.
       */
      localUfrag: any;
      /**
       * The remote ICE username fragment for this session.
       */
      remoteUfrag: any;
      /**
       * The signaling layer which operates this peer connection.
       * @type {SignalingLayer}
       */
      signalingLayer: any;
      _peerVideoTypeChanged: any;
      _peerMutedChanged: any;
      options: {
          disableSimulcast: boolean;
          disableRtx: boolean;
          capScreenshareBitrate: boolean;
          disabledCodec: string;
          disableH264: boolean;
          preferH264: boolean;
          preferredCodec: string;
          startSilent: boolean;
      };
      peerconnection: RTCPeerConnection;
      videoBitrates: any;
      tpcUtils: TPCUtils;
      updateLog: any[];
      stats: {};
      statsinterval: number;
      /**
       * @type {number} The max number of stats to keep in this.stats. Limit to
       * 300 values, i.e. 5 minutes; set to 0 to disable
       */
      maxstats: number;
      interop: any;
      simulcast: any;
      sdpConsistency: SdpConsistency;
      /**
       * Munges local SDP provided to the Jingle Session in order to prevent from
       * sending SSRC updates on attach/detach and mute/unmute (for video).
       * @type {LocalSdpMunger}
       */
      localSdpMunger: LocalSdpMunger;
      /**
       * TracablePeerConnection uses RTC's eventEmitter
       * @type {EventEmitter}
       */
      eventEmitter: any;
      rtxModifier: RtxModifier;
      /**
       * The height constraint applied on the video sender.
       */
      senderVideoMaxHeight: any;
      codecPreference: {
          enable: boolean;
          mediaType: string;
          mimeType: string;
      };
      trace: (what: any, info: any) => void;
      onicecandidate: any;
      onsignalingstatechange: any;
      oniceconnectionstatechange: any;
      onnegotiationneeded: any;
      ondatachannel: any;
      private _processStat;
      getConnectionState(): string;
      private _getDesiredMediaDirection;
      isSimulcastOn(): boolean;
      getAudioLevels(): any;
      getLocalTracks(mediaType?: typeof MediaType): Array<any>;
      getLocalVideoTrack(): any | undefined;
      hasAnyTracksOfType(mediaType: typeof MediaType): boolean;
      getRemoteTracks(endpointId?: string, mediaType?: typeof MediaType): Array<JitsiRemoteTrack>;
      getTrackBySSRC(ssrc: number): any | null;
      getSsrcByTrackId(id: string): number | null;
      _remoteStreamAdded(stream: MediaStream): void;
      _remoteTrackAdded(stream: MediaStream, track: MediaStreamTrack, transceiver?: RTCRtpTransceiver): void;
      _createRemoteTrack(ownerEndpointId: string, stream: MediaStream, track: MediaStreamTrack, mediaType: typeof MediaType, videoType?: {
          CAMERA: string;
          DESKTOP: string;
      }, ssrc: number, muted: boolean): void;
      _remoteStreamRemoved(stream: any): void;
      _remoteTrackRemoved(stream: MediaStream, track: MediaStreamTrack): void;
      private _getRemoteTrackById;
      removeRemoteTracks(owner: string): JitsiRemoteTrack[];
      _removeRemoteTrack(toBeRemoved: JitsiRemoteTrack): void;
      _removeRemoteTrackById(streamId: string, trackId: string): JitsiRemoteTrack | undefined;
      getLocalSSRC(localTrack: any): number;
      _injectSsrcGroupForUnifiedSimulcast(desc: any): any;
      _getSSRC(rtcId: any): TPCSSRCInfo;
      _mungeCodecOrder(description: RTCSessionDescription): RTCSessionDescription;
      containsTrack(track: any | JitsiRemoteTrack): boolean;
      addTrack(track: any, isInitiator?: boolean): Promise<void>;
      addTrackUnmute(track: any): Promise<boolean>;
      private _addStream;
      _removeStream(mediaStream: MediaStream): void;
      private _assertTrackBelongs;
      isMediaStreamInPc(mediaStream: MediaStream): boolean;
      removeTrack(localTrack: any): void;
      findSenderByKind(mediaType: any): any | undefined;
      findReceiverForTrack(track: any): RTCRtpReceiver | undefined;
      findSenderForTrack(track: any): RTCRtpSender | undefined;
      replaceTrack(oldTrack: any | null, newTrack: any | null): Promise<boolean>;
      removeTrackMute(localTrack: any): Promise<boolean>;
      createDataChannel(label: any, opts: any): RTCDataChannel;
      private _ensureSimulcastGroupIsLast;
      private _adjustLocalMediaDirection;
      setLocalDescription(description: any): Promise<any>;
      public setAudioTransferActive(active: boolean): boolean;
      setSenderVideoDegradationPreference(): Promise<void>;
      setMaxBitRate(): Promise<void>;
      setRemoteDescription(description: any): Promise<any>;
      setSenderVideoConstraint(frameHeight?: number): Promise<any>;
      public setVideoTransferActive(active: boolean): boolean;
      sendTones(tones: string, duration?: number, interToneGap?: number): void;
      private _onToneChange;
      generateRecvonlySsrc(): void;
      clearRecvonlySsrc(): void;
      close(): void;
      createAnswer(constraints: any): Promise<any>;
      createOffer(constraints: any): Promise<any>;
      _createOfferOrAnswer(isOffer: any, constraints: any): Promise<any>;
      _extractPrimarySSRC(ssrcObj: TrackSSRCInfo): number | null;
      private _processLocalSSRCsMap;
      addIceCandidate(candidate: any): Promise<void>;
      getStats(callback: Function, errback: Function): void;
      generateNewStreamSSRCInfo(track: any): TPCSSRCInfo;
      toString(): string;
  }
  /**
   * {@code RTCDTMFSender.insertDTMF}, 'tones' argument.
   */
  export type TouchToneRequest = {
      /**
       * - The DTMF tones string as defined by
       * {
       */
      tones: string;
  };
  export type TPCGroupInfo = {
      /**
       * the SSRC groups semantics
       */
      semantics: string;
      /**
       * group's SSRCs in order where the first
       * one is group's primary SSRC, the second one is secondary (RTX) and so
       * on...
       */
      ssrcs: Array<number>;
  };
  export type TPCSSRCInfo = {
      /**
       * an array which holds all track's SSRCs
       */
      ssrcs: Array<number>;
      /**
       * an array stores all track's SSRC
       * groups
       */
      groups: Array<TPCGroupInfo>;
  };
  export type SSRCGroupInfo = {
      /**
       * group's SSRCs
       */
      ssrcs: Array<number>;
      semantics: string;
  };
  export type TrackSSRCInfo = {
      /**
       * track's SSRCs
       */
      ssrcs: Array<number>;
      /**
       * track's SSRC groups
       */
      groups: Array<SSRCGroupInfo>;
  };
  import RTC from "@lyno/lib-jitsi-meet/modules/RTC/RTC";
  import * as MediaType from "@lyno/lib-jitsi-meet/service/RTC/MediaType";
  import JitsiRemoteTrack from "@lyno/lib-jitsi-meet/modules/RTC/JitsiRemoteTrack";
  import { TPCUtils } from "@lyno/lib-jitsi-meet/modules/RTC/TPCUtils";
  import SdpConsistency from "@lyno/lib-jitsi-meet/modules/xmpp/SdpConsistency";
  import LocalSdpMunger from "@lyno/lib-jitsi-meet/modules/RTC/LocalSdpMunger";
  import RtxModifier from "@lyno/lib-jitsi-meet/modules/xmpp/RtxModifier";

}
declare module '@lyno/lib-jitsi-meet/modules/browser/BrowserCapabilities' {
  /**
   * Implements browser capabilities for lib-jitsi-meet.
   */
  export default class BrowserCapabilities {
      /**
       * Tells whether or not the <tt>MediaStream/tt> is removed from
       * the <tt>PeerConnection</tt> and disposed on video mute (in order to turn
       * off the camera device).
       * @return {boolean} <tt>true</tt> if the current browser supports this
       * strategy or <tt>false</tt> otherwise.
       */
      doesVideoMuteByStreamRemove(): boolean;
      /**
       * Check whether or not the current browser support peer to peer connections
       * @return {boolean} <tt>true</tt> if p2p is supported or <tt>false</tt>
       * otherwise.
       */
      supportsP2P(): boolean;
      /**
       * Checks if the current browser is Chromium based, that is, it's either
       * Chrome / Chromium or uses it as its engine, but doesn't identify as
       * Chrome.
       *
       * This includes the following browsers:
       * - Chrome and Chromium
       * - Other browsers which use the Chrome engine, but are detected as Chrome,
       *   such as Brave and Vivaldi
       * - Browsers which are NOT Chrome but use it as their engine, and have
       *   custom detection code: Opera, Electron and NW.JS
       */
      isChromiumBased(): any;
      /**
       * Checks whether current running context is a Trusted Web Application.
       *
       * @returns {boolean} Whether the current context is a TWA.
       */
      isTwa(): boolean;
      /**
       * Checks if the current browser is supported.
       *
       * @returns {boolean} true if the browser is supported, false otherwise.
       */
      isSupported(): boolean;
      /**
       * Returns whether or not the current environment needs a user interaction
       * with the page before any unmute can occur.
       *
       * @returns {boolean}
       */
      isUserInteractionRequiredForUnmute(): boolean;
      /**
       * Checks if the current browser triggers 'onmute'/'onunmute' events when
       * user's connection is interrupted and the video stops playback.
       * @returns {*|boolean} 'true' if the event is supported or 'false'
       * otherwise.
       */
      supportsVideoMuteOnConnInterrupted(): any | boolean;
      /**
       * Checks if the current browser reports upload and download bandwidth
       * statistics.
       * @return {boolean}
       */
      supportsBandwidthStatistics(): boolean;
      /**
       * Checks if the current browser supports setting codec preferences on the transceiver.
       * @returns {boolean}
       */
      supportsCodecPreferences(): boolean;
      /**
       * Checks if the current browser support the device change event.
       * @return {boolean}
       */
      supportsDeviceChangeEvent(): boolean;
      /**
       * Checks if the current browser supports RTT statistics for srflx local
       * candidates through the legacy getStats() API.
       */
      supportsLocalCandidateRttStatistics(): any;
      /**
       * Checks if the current browser supports the Long Tasks API that lets us observe
       * performance measurement events and be notified of tasks that take longer than
       * 50ms to execute on the main thread.
       */
      supportsPerformanceObserver(): boolean;
      /**
       * Checks if the current browser supports audio level stats on the receivers.
       */
      supportsReceiverStats(): boolean;
      /**
       * Checks if the current browser reports round trip time statistics for
       * the ICE candidate pair.
       * @return {boolean}
       */
      supportsRTTStatistics(): boolean;
      /**
       * Checks if the browser uses plan B.
       *
       * @returns {boolean}
       */
      usesPlanB(): boolean;
      /**
       * Checks if the browser uses SDP munging for turning on simulcast.
       *
       * @returns {boolean}
       */
      usesSdpMungingForSimulcast(): boolean;
      /**
       * Checks if the browser uses unified plan.
       *
       * @returns {boolean}
       */
      usesUnifiedPlan(): boolean;
      /**
       * Returns whether or not the current browser should be using the new
       * getUserMedia flow, which utilizes the adapter shim. This method should
       * be temporary and used while migrating all browsers to use adapter and
       * the new getUserMedia.
       *
       * @returns {boolean}
       */
      usesNewGumFlow(): boolean;
      /**
       * Checks if the browser uses webrtc-adapter. All browsers using the new
       * getUserMedia flow.
       *
       * @returns {boolean}
       */
      usesAdapter(): boolean;
      /**
       * Checks if the browser uses RIDs/MIDs for siganling the simulcast streams
       * to the bridge instead of the ssrcs.
       */
      usesRidsForSimulcast(): boolean;
      /**
       * Checks if the browser supports getDisplayMedia.
       * @returns {boolean} {@code true} if the browser supports getDisplayMedia.
       */
      supportsGetDisplayMedia(): boolean;
      /**
       * Checks if the browser supports insertable streams, needed for E2EE.
       * @returns {boolean} {@code true} if the browser supports insertable streams.
       */
      supportsInsertableStreams(): boolean;
      /**
       * Whether the browser supports the RED format for audio.
       */
      supportsAudioRed(): boolean;
      /**
       * Checks if the browser supports the "sdpSemantics" configuration option.
       * https://webrtc.org/web-apis/chrome/unified-plan/
       *
       * @returns {boolean}
       */
      supportsSdpSemantics(): boolean;
      /**
       * Returns the version of a Chromium based browser.
       *
       * @returns {Number}
       */
      _getChromiumBasedVersion(): number;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/browser/index' {
  var _default: BrowserCapabilities;
  export default _default;
  import BrowserCapabilities from "@lyno/lib-jitsi-meet/modules/browser/BrowserCapabilities";

}
declare module '@lyno/lib-jitsi-meet/modules/connectivity/ConnectionQuality' {
  /**
   * A class which monitors the local statistics coming from the RTC modules, and
   * calculates a "connection quality" value, in percent, for the media
   * connection. A value of 100% indicates a very good network connection, and a
   * value of 0% indicates a poor connection.
   */
  export default class ConnectionQuality {
      /**
       *
       * @param conference
       * @param eventEmitter
       * @param options
       */
      constructor(conference: any, eventEmitter: any, options: any);
      eventEmitter: any;
      /**
       * The owning JitsiConference.
       */
      _conference: any;
      /**
       * Holds statistics about the local connection quality.
       */
      _localStats: {
          connectionQuality: number;
          jvbRTT: any;
      };
      /**
       * The time this._localStats.connectionQuality was last updated.
       */
      _lastConnectionQualityUpdate: number;
      /**
       * Maps a participant ID to an object holding connection quality
       * statistics received from this participant.
       */
      _remoteStats: {};
      /**
       * The time that the ICE state last changed to CONNECTED. We use this
       * to calculate how much time we as a sender have had to ramp-up.
       */
      _timeIceConnected: number;
      /**
       * The time that local video was unmuted. We use this to calculate how
       * much time we as a sender have had to ramp-up.
       */
      _timeVideoUnmuted: number;
      /**
       * The time at which a video bitrate cap was last removed.  We use
       * this to calculate how much time we, as a sender, have had to
       * ramp-up
       */
      _timeLastBwCapRemoved: number;
      /**
       * Sets _timeVideoUnmuted if it was previously unset. If it was already set,
       * doesn't change it.
       */
      _maybeUpdateUnmuteTime(): void;
      /**
       * Calculates a new "connection quality" value.
       * @param videoType {VideoType} the type of the video source (camera or
       * a screen capture).
       * @param isMuted {boolean} whether the local video is muted.
       * @param resolutionName {Resolution} the input resolution used by the
       * camera.
       * @returns {*} the newly calculated connection quality.
       */
      _calculateConnectionQuality(videoType: {
          CAMERA: string;
          DESKTOP: string;
      }, isMuted: boolean, resolutionName: any): any;
      /**
       * Updates the localConnectionQuality value
       * @param values {number} the new value. Should be in [0, 100].
       */
      _updateLocalConnectionQuality(value: any): void;
      /**
       * Broadcasts the local statistics to all other participants in the
       * conference.
       */
      _broadcastLocalStats(): void;
      /**
       * Updates the local statistics
       * @param {TraceablePeerConnection} tpc the peerconnection which emitted
       * the stats
       * @param data new statistics
       */
      _updateLocalStats(tpc: any, data: any): void;
      /**
       * Updates remote statistics
       * @param id the id of the remote participant
       * @param data the statistics received
       */
      _updateRemoteStats(id: any, data: any): void;
      /**
       * Returns the local statistics.
       * Exported only for use in jitsi-meet-torture.
       */
      getStats(): {
          connectionQuality: number;
          jvbRTT: any;
      };
  }

}
declare module '@lyno/lib-jitsi-meet/modules/connectivity/IceFailedHandling' {
  /**
   * This class deals with shenanigans around JVB media session's ICE failed status handling.
   *
   * If ICE restarts are NOT explicitly enabled by the {@code enableIceRestart} config option, then the conference will
   * delay emitting the {@JitsiConferenceErrors.ICE_FAILED} event by 15 seconds. If the network info module reports
   * the internet offline status then the time will start counting after the internet comes back online.
   *
   * If ICE restart are enabled, then a delayed ICE failed notification to Jicofo will be sent, only if the ICE connection
   * does not recover soon after or before the XMPP connection is restored (if it was ever broken). If ICE fails while
   * the XMPP connection is not broken then the notifications will be sent after 2 seconds delay.
   */
  export default class IceFailedHandling {
      /**
       * Creates new {@code DelayedIceFailed} task.
       * @param {JitsiConference} conference
       */
      constructor(conference: any);
      _conference: any;
      /**
       * After making sure there's no way for the ICE connection to recover this method either sends ICE failed
       * notification to Jicofo or emits the ice failed conference event.
       * @private
       * @returns {void}
       */
      private _actOnIceFailed;
      /**
       * Starts the task.
       */
      start(): void;
      _iceFailedTimeout: any;
      /**
       * Cancels the task.
       */
      cancel(): void;
      _canceled: boolean;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/connectivity/NetworkInfo' {
  export const NETWORK_INFO_EVENT: "NETWORK_INFO_CHANGED";
  /**
   * Module provides information about the current status of the internet
   * connection. Lib-jitsi-meet doesn't have any logic for detecting internet
   * online/offline, but rather it relies on the information supplied by the app
   * that uses it. By default the online state is assumed and the lib acts as if
   * it was connected. See {@link JitsiMeetJS.setNetworkInfo}.
   */
  export class NetworkInfo extends Listenable {
      /**
       * Creates new {@link NetworkInfo} instance.
       */
      constructor();
      _current: {
          isOnline: boolean;
      };
      /**
       * Updates the network info state.
       * @param {boolean} isOnline - {@code true} if internet is online or {@code false} otherwise.
       */
      updateNetworkInfo({ isOnline }: boolean): void;
      /**
       * Returns the online/offline internet status. By default the value is {@code true} and changes only if
       * the lib's user wires the state through {@link JitsiMeetJS.setNetworkInfo} like the jitsi-meet does. Because of
       * that any logic should still assume that the internet may be offline and should handle the failure gracefully.
       * It's only a good hint in the other way around: to pause internet operations until it comes back online.
       * @returns {boolean}
       */
      isOnline(): boolean;
  }
  export default networkInfo;
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";
  const networkInfo: NetworkInfo;

}
declare module '@lyno/lib-jitsi-meet/modules/connectivity/ParticipantConnectionStatus' {
  /**
   * Participant connection statuses.
   *
   * @type {{
   *      ACTIVE: string,
   *      INACTIVE: string,
   *      INTERRUPTED: string,
   *      RESTORING: string
   * }}
   */
  export const ParticipantConnectionStatus: {
      ACTIVE: string;
      INACTIVE: string;
      INTERRUPTED: string;
      RESTORING: string;
  };
  /**
   * Class is responsible for emitting
   * JitsiConferenceEvents.PARTICIPANT_CONN_STATUS_CHANGED events.
   */
  export default class ParticipantConnectionStatusHandler {
      /**
       * Calculates the new {@link ParticipantConnectionStatus} based on
       * the values given for some specific remote user. It is assumed that
       * the conference is currently in the JVB mode (in contrary to the P2P mode)
       * @param {boolean} isConnectionActiveByJvb true if the JVB did not get any
       * data from the user for the last 15 seconds.
       * @param {boolean} isInLastN indicates whether the user is in the last N
       * set. When set to false it means that JVB is not sending any video for
       * the user.
       * @param {boolean} isRestoringTimedout if true it means that the user has
       * been outside of last N too long to be considered
       * {@link ParticipantConnectionStatus.RESTORING}.
       * @param {boolean} isVideoMuted true if the user is video muted and we
       * should not expect to receive any video.
       * @param {boolean} isVideoTrackFrozen if the current browser support video
       * frozen detection then it will be set to true when the video track is
       * frozen. If the current browser does not support frozen detection the it's
       * always false.
       * @return {ParticipantConnectionStatus} the new connection status for
       * the user for whom the values above were provided.
       * @private
       */
      private static _getNewStateForJvbMode;
      /**
       * In P2P mode we don't care about any values coming from the JVB and
       * the connection status can be only active or interrupted.
       * @param {boolean} isVideoMuted the user if video muted
       * @param {boolean} isVideoTrackFrozen true if the video track for
       * the remote user is currently frozen. If the current browser does not
       * support video frozen detection then it's always false.
       * @return {ParticipantConnectionStatus}
       * @private
       */
      private static _getNewStateForP2PMode;
      /**
       * Creates new instance of <tt>ParticipantConnectionStatus</tt>.
       *
       * @constructor
       * @param {RTC} rtc the RTC service instance
       * @param {JitsiConference} conference parent conference instance
       * @param {Object} options
       * @param {number} [options.rtcMuteTimeout=2000] custom value for
       * {@link ParticipantConnectionStatus.rtcMuteTimeout}.
       * @param {number} [options.outOfLastNTimeout=500] custom value for
       * {@link ParticipantConnectionStatus.outOfLastNTimeout}.
       */
      constructor(rtc: any, conference: any, options: {
          rtcMuteTimeout?: number;
          outOfLastNTimeout?: number;
      });
      rtc: any;
      conference: any;
      /**
       * A map of the "endpoint ID"(which corresponds to the resource part
       * of MUC JID(nickname)) to the timeout callback IDs scheduled using
       * window.setTimeout.
       * @type {Object.<string, number>}
       */
      trackTimers: {
          [x: string]: number;
      };
      /**
       * This map holds the endpoint connection status received from the JVB
       * (as it might be different than the one stored in JitsiParticipant).
       * Required for getting back in sync when remote video track is removed.
       * @type {Object.<string, boolean>}
       */
      connStatusFromJvb: {
          [x: string]: boolean;
      };
      /**
       * If video track frozen detection through RTC mute event is supported,
       * we wait some time until video track is considered frozen. But because
       * when the user falls out of last N it is expected for the video to
       * freeze this timeout must be significantly reduced in "out of last N"
       * case.
       *
       * Basically this value is used instead of {@link rtcMuteTimeout} when
       * user is not in last N.
       * @type {number}
       */
      outOfLastNTimeout: number;
      /**
       * How long we're going to wait after the RTC video track muted event
       * for the corresponding signalling mute event, before the connection
       * interrupted is fired. The default value is
       * {@link DEFAULT_RTC_MUTE_TIMEOUT}.
       *
       * @type {number} amount of time in milliseconds
       */
      rtcMuteTimeout: number;
      /**
       * This map holds a timestamp indicating  when participant's video track
       * was RTC muted (it is assumed that each participant can have only 1
       * video track at a time). The purpose of storing the timestamp is to
       * avoid the transition to disconnected status in case of legitimate
       * video mute operation where the signalling video muted event can
       * arrive shortly after RTC muted event.
       *
       * The key is participant's ID which is the same as endpoint id in
       * the Colibri conference allocated on the JVB.
       *
       * The value is a timestamp measured in milliseconds obtained with
       * <tt>Date.now()</tt>.
       *
       * FIXME merge this logic with NO_DATA_FROM_SOURCE event
       *       implemented in JitsiLocalTrack by extending the event to
       *       the remote track and allowing to set different timeout for
       *       local and remote tracks.
       *
       * @type {Object.<string, number>}
       */
      rtcMutedTimestamp: {
          [x: string]: number;
      };
      /**
       * This map holds the timestamps indicating when participant's video
       * entered lastN set. Participants entering lastN will have connection
       * status restoring and when we start receiving video will become
       * active, but if video is not received for certain time
       * {@link DEFAULT_RESTORING_TIMEOUT} that participant connection status
       * will become interrupted.
       *
       * @type {Map<string, number>}
       */
      enteredLastNTimestamp: Map<string, number>;
      /**
       * A map of the "endpoint ID"(which corresponds to the resource part
       * of MUC JID(nickname)) to the restoring timeout callback IDs
       * scheduled using window.setTimeout.
       *
       * @type {Map<string, number>}
       */
      restoringTimers: Map<string, number>;
      /**
       * A map that holds the current connection status (along with all the internal events that happen
       * while in that state).
       *
       * The goal is to send this information to the analytics backend for post-mortem analysis.
       */
      connectionStatusMap: Map<any, any>;
      /**
       * Gets the video frozen timeout for given user.
       * @param {string} id endpoint/participant ID
       * @return {number} how long are we going to wait since RTC video muted
       * even, before a video track is considered frozen.
       * @private
       */
      private _getVideoFrozenTimeout;
      /**
       * Initializes <tt>ParticipantConnectionStatus</tt> and bind required event
       * listeners.
       */
      init(): void;
      _onEndpointConnStatusChanged: any;
      _onP2PStatus: any;
      _onUserLeft: any;
      _onTrackRtcMuted: any;
      _onTrackRtcUnmuted: any;
      _onRemoteTrackAdded: any;
      _onRemoteTrackRemoved: any;
      _onSignallingMuteChanged: any;
      _onTrackVideoTypeChanged: any;
      /**
       * On change in Last N set check all leaving and entering participants to
       * change their corresponding statuses.
       *
       * @param {Array<string>} leavingLastN - The array of ids leaving lastN.
       * @param {Array<string>} enteringLastN - The array of ids entering lastN.
       * @private
       */
      private _onLastNChanged;
      _onLastNValueChanged: any;
      /**
       * Removes all event listeners and disposes of all resources held by this
       * instance.
       */
      dispose(): void;
      /**
       * Handles RTCEvents.ENDPOINT_CONN_STATUS_CHANGED triggered when we receive
       * notification over the data channel from the bridge about endpoint's
       * connection status update.
       * @param {string} endpointId - The endpoint ID(MUC nickname/resource JID).
       * @param {boolean} isActive - true if the connection is OK or false otherwise.
       */
      onEndpointConnStatusChanged(endpointId: string, isActive: boolean): void;
      /**
       * Changes connection status.
       * @param {JitsiParticipant} participant
       * @param newStatus
       */
      _changeConnectionStatus(participant: any, newStatus: any): void;
      /**
       * Reset the postponed "connection interrupted" event which was previously
       * scheduled as a timeout on RTC 'onmute' event.
       *
       * @param {string} participantId - The participant for which the "connection
       * interrupted" timeout was scheduled.
       */
      clearTimeout(participantId: string): void;
      /**
       * Clears the timestamp of the RTC muted event for participant's video track
       * @param {string} participantId the id of the conference participant which
       * is the same as the Colibri endpoint ID of the video channel allocated for
       * the user on the videobridge.
       */
      clearRtcMutedTimestamp(participantId: string): void;
      /**
       * Bind signalling mute event listeners for video {JitsiRemoteTrack} when
       * a new one is added to the conference.
       *
       * @param {JitsiTrack} remoteTrack - The {JitsiTrack} which is being added to
       * the conference.
       */
      onRemoteTrackAdded(remoteTrack: any): void;
      /**
       * Removes all event listeners bound to the remote video track and clears
       * any related timeouts.
       *
       * @param {JitsiRemoteTrack} remoteTrack - The remote track which is being
       * removed from the conference.
       */
      onRemoteTrackRemoved(remoteTrack: any): void;
      /**
       * Checks if given participant's video is considered frozen.
       * @param {JitsiParticipant} participant - The participant.
       * @return {boolean} <tt>true</tt> if the video has frozen for given
       * participant or <tt>false</tt> when it's either not considered frozen
       * (yet) or if freeze detection is not supported by the current browser.
       *
       * FIXME merge this logic with NO_DATA_FROM_SOURCE event
       *       implemented in JitsiLocalTrack by extending the event to
       *       the remote track and allowing to set different timeout for
       *       local and remote tracks.
       *
       */
      isVideoTrackFrozen(participant: any): boolean;
      /**
       * Goes over every participant and updates connectivity status.
       * Should be called when a parameter which affects all of the participants
       * is changed (P2P for example).
       */
      refreshConnectionStatusForAll(): void;
      /**
       * Figures out (and updates) the current connectivity status for
       * the participant identified by the given id.
       *
       * @param {string} id - The participant's id (MUC nickname or Colibri endpoint ID).
       */
      figureOutConnectionStatus(id: string): void;
      /**
       * Computes the duration of the current connection status for the participant with the specified id (i.e. 15 seconds
       * in the INTERRUPTED state) and sends a participant connection status event.
       * @param {string} id - The jid of the participant.
       * @param {Number} nowMs - The current time (in millis).
       * @returns {void}
       */
      maybeSendParticipantConnectionStatusEvent(id: string, nowMs: number): void;
      /**
       * Clears the restoring timer for participant's video track and the
       * timestamp for entering lastN.
       *
       * @param {string} participantId - The id of the conference participant which
       * is the same as the Colibri endpoint ID of the video channel allocated for
       * the user on the videobridge.
       */
      _clearRestoringTimer(participantId: string): void;
      /**
       * Checks whether a track had stayed enough in restoring state, compares
       * current time and the time the track entered in lastN. If it hasn't
       * timedout and there is no timer added, add new timer in order to give it
       * more time to become active or mark it as interrupted on next check.
       *
       * @param {string} participantId - The id of the conference participant which
       * is the same as the Colibri endpoint ID of the video channel allocated for
       * the user on the videobridge.
       * @returns {boolean} <tt>true</tt> if the track was in restoring state
       * more than the timeout ({@link DEFAULT_RESTORING_TIMEOUT}.) in order to
       * set its status to interrupted.
       * @private
       */
      private _isRestoringTimedout;
      /**
       * Sends a last/final participant connection status event for the participant that left the conference.
       * @param {string} id - The id of the participant that left the conference.
       * @returns {void}
       */
      onUserLeft(id: string): void;
      /**
       * Handles RTC 'onmute' event for the video track.
       *
       * @param {JitsiRemoteTrack} track - The video track for which 'onmute' event
       * will be processed.
       */
      onTrackRtcMuted(track: any): void;
      /**
       * Handles RTC 'onunmute' event for the video track.
       *
       * @param {JitsiRemoteTrack} track - The video track for which 'onunmute'
       * event will be processed.
       */
      onTrackRtcUnmuted(track: any): void;
      /**
       * Here the signalling "mute"/"unmute" events are processed.
       *
       * @param {JitsiRemoteTrack} track - The remote video track for which
       * the signalling mute/unmute event will be processed.
       */
      onSignallingMuteChanged(track: any): void;
      /**
       * Sends a participant connection status event as a result of the video type
       * changing.
       * @param {JitsiRemoteTrack} track - The track.
       * @param {VideoType} type - The video type.
       * @returns {void}
       */
      onTrackVideoTypeChanged(track: any, type: any): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/detection/ActiveDeviceDetector' {
  /**
   * Go through all audio devices on the system and return one that is active, i.e. has audio signal.
   *
   * @returns Promise<Object> - Object containing information about the found device.
   */
  export default function getActiveAudioDevice(): Promise<any>;

}
declare module '@lyno/lib-jitsi-meet/modules/detection/DetectionEvents' {
  /**
   * Event triggered by a audio detector indicating that its active state has changed from active to inactive or vice
   * versa.
   * @event
   * @type {boolean} - true when service has changed to active false otherwise.
   */
  export const DETECTOR_STATE_CHANGE: boolean;
  /** Event triggered by {@link NoAudioSignalDetector} when the local audio device associated with a JitsiConference
   * starts receiving audio levels with the value of 0 meaning no audio is being captured on that device, or when
   * it starts receiving audio levels !== 0 after being in a state of no audio.
   * @event
   * @type {boolean} - true when the current conference audio track has audio input false otherwise.
   */
  export const AUDIO_INPUT_STATE_CHANGE: boolean;
  /** Event triggered by NoAudioSignalDetector when the local audio device associated with a JitsiConference goes silent
   * for a period of time, meaning that the device is either broken or hardware/software muted.
   * @event
   * @type {void}
   */
  export const NO_AUDIO_INPUT: void;
  /**
   *  Event generated by {@link VADNoiseDetection} when the tracked device is considered noisy.
   *  @event
   *  @type {Object}
   */
  export const VAD_NOISY_DEVICE: any;
  /**
   * Event generated by VADReportingService when if finishes creating a VAD report for the monitored devices.
   * The generated objects are of type Array<Object>, one score for each monitored device.
   * @event VAD_REPORT_PUBLISHED
   * @type Array<Object> with the following structure:
   * @property {Date} timestamp - Timestamp at which the compute took place.
   * @property {number} avgVAD - Average VAD score over monitored period of time.
   * @property {string} deviceId - Associate local audio device ID.
   */
  export const VAD_REPORT_PUBLISHED: Array<any>;
  /**
   * Event generated by {@link TrackVADEmitter} when PCM sample VAD score is available.
   *
   * @event
   * @type {Object}
   * @property {Date}   timestamp - Exact time at which processed PCM sample was generated.
   * @property {number} score - VAD score on a scale from 0 to 1 (i.e. 0.7)
   * @property {Float32Array} pcmData - Raw PCM data with which the VAD score was calculated.
   * @property {string} deviceId - Device id of the associated track.
   */
  export const VAD_SCORE_PUBLISHED: any;
  /**
   *  Event generated by {@link VADTalkMutedDetection} when a user is talking while the mic is muted.
   *
   *  @event
   *  @type {Object}
   */
  export const VAD_TALK_WHILE_MUTED: any;

}
declare module '@lyno/lib-jitsi-meet/modules/detection/NoAudioSignalDetection' {
  /**
   * Detect if there is no audio input on the current TraceAblePeerConnection selected track. The no audio
   * state must be constant for a configured amount of time in order for the event to be triggered.
   * @fires DetectionEvents.AUDIO_INPUT_STATE_CHANGE
   * @fires DetectionEvents.NO_AUDIO_INPUT
   */
  export default class NoAudioSignalDetection {
      /**
       * Creates new NoAudioSignalDetection.
       *
       * @param conference the JitsiConference instance that created us.
       * @constructor
       */
      constructor(conference: any);
      _conference: any;
      _timeoutTrigger: NodeJS.Timeout;
      _hasAudioInput: boolean;
      /**
       * Clear the timeout state.
       */
      _clearTriggerTimeout(): void;
      /**
       * Generated event triggered by a change in the current conference audio input state.
       *
       * @param {*} audioLevel - The audio level of the ssrc.
       * @fires DetectionEvents.AUDIO_INPUT_STATE_CHANGE
       */
      _handleAudioInputStateChange(audioLevel: any): void;
      /**
       * Generate event triggered by a prolonged period of no audio input.
       *
       * @param {number} audioLevel - The audio level of the ssrc.
       * @fires DetectionEvents.NO_AUDIO_INPUT
       */
      _handleNoAudioInputDetection(audioLevel: number): void;
      _eventFired: boolean;
      /**
       * Receives audio level events for all send and receive streams on the current TraceablePeerConnection.
       *
       * @param {TraceablePeerConnection} tpc - TraceablePeerConnection of the owning conference.
       * @param {number} ssrc - The synchronization source identifier (SSRC) of the endpoint/participant/stream
       * being reported.
       * @param {number} audioLevel - The audio level of the ssrc.
       * @param {boolean} isLocal - true for local/send streams or false for remote/receive streams.
       */
      _audioLevel(tpc: any, ssrc: number, audioLevel: number, isLocal: boolean): void;
      /**
       * Notifies NoAudioSignalDetection that a JitsiTrack was added to the associated JitsiConference.
       * Only take into account local audio tracks.
       *
       * @param {JitsiTrack} track - The added JitsiTrack.
       */
      _trackAdded(track: any): void;
      _audioTrack: any;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/detection/P2PDominantSpeakerDetection' {
  /**
   * The <tt>P2PDominantSpeakerDetection</tt> is activated only when p2p is
   * currently used.
   * Listens for changes in the audio level changes of the local p2p audio track
   * or remote p2p one and fires dominant speaker events to be able to use
   * features depending on those events (speaker stats), to make them work without
   * the video bridge.
   */
  export default class P2PDominantSpeakerDetection {
      /**
       * Creates P2PDominantSpeakerDetection
       * @param conference the JitsiConference instance that created us.
       * @constructor
       */
      constructor(conference: any);
      conference: any;
      myUserID: any;
      /**
       * Receives audio level events for all streams in the conference.
       *
       * @param {String} id - The participant id
       * @param {number} audioLevel - The audio level.
       */
      _audioLevel(id: string, audioLevel: number): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/detection/TrackVADEmitter' {
  /**
   * Connects an audio JitsiLocalTrack to a vadProcessor using WebAudio ScriptProcessorNode.
   * Once an object is created audio from the local track flows through the ScriptProcessorNode as raw PCM.
   * The PCM is processed by the injected vad module and a voice activity detection score is obtained, the
   * score is published to consumers via an EventEmitter.
   * After work is done with this service the destroy method needs to be called for a proper cleanup.
   *
   * @fires VAD_SCORE_PUBLISHED
   */
  export default class TrackVADEmitter {
      /**
       * Factory method that sets up all the necessary components for the creation of the TrackVADEmitter.
       *
       * @param {string} micDeviceId - Target microphone device id.
       * @param {number} procNodeSampleRate - Sample rate of the proc node.
       * @param {Object} vadProcessor -Module that calculates the voice activity score for a certain audio PCM sample.
       * The processor needs to implement the following functions:
       * - <tt>getSampleLength()</tt> - Returns the sample size accepted by getSampleLength.
       * - <tt>getRequiredPCMFrequency()</tt> - Returns the PCM frequency at which the processor operates.
       * - <tt>calculateAudioFrameVAD(pcmSample)</tt> - Process a 32 float pcm sample of getSampleLength size.
       * @returns {Promise<TrackVADEmitter>} - Promise resolving in a new instance of TrackVADEmitter.
       */
      static create(micDeviceId: string, procNodeSampleRate: number, vadProcessor: any): Promise<TrackVADEmitter>;
      /**
       * Constructor.
       *
       * @param {number} procNodeSampleRate - Sample rate of the ScriptProcessorNode. Possible values  256, 512, 1024,
       *  2048, 4096, 8192, 16384. Passing other values will default to closes neighbor.
       * @param {Object} vadProcessor - VAD processor that allows us to calculate VAD score for PCM samples.
       * @param {JitsiLocalTrack} jitsiLocalTrack - JitsiLocalTrack corresponding to micDeviceId.
       */
      constructor(procNodeSampleRate: number, vadProcessor: any, jitsiLocalTrack: any);
      /**
       * Sample rate of the ScriptProcessorNode.
       */
      _procNodeSampleRate: number;
      /**
       * VAD Processor that allows us to calculate VAD score for PCM samples
       */
      _vadProcessor: any;
      /**
       * The JitsiLocalTrack instance.
       */
      _localTrack: any;
      /**
       * Buffer to hold residue PCM resulting after a ScriptProcessorNode callback
       */
      _bufferResidue: Float32Array;
      /**
       * The AudioContext instance with the preferred sample frequency.
       */
      _audioContext: AudioContext;
      /**
       * PCM Sample size expected by the VAD Processor instance. We cache it here as this value is used extensively,
       * saves a couple of function calls.
       */
      _vadSampleSize: any;
      /**
       * ScriptProcessorNode callback, the input parameters contains the PCM audio that is then sent to rnnoise.
       * Rnnoise only accepts PCM samples of 480 bytes whereas the webaudio processor node can't sample at a multiple
       * of 480 thus after each _onAudioProcess callback there will remain and PCM buffer residue equal
       * to _procNodeSampleRate / 480 which will be added to the next sample buffer and so on.\
       *
       *
       * @param {AudioProcessingEvent} audioEvent - Audio event.
       * @returns {void}
       * @fires VAD_SCORE_PUBLISHED
       */
      _onAudioProcess(audioEvent: AudioProcessingEvent): void;
      /**
       * Sets up the audio graph in the AudioContext.
       *
       * @returns {void}
       */
      _initializeAudioContext(): void;
      _audioSource: MediaStreamAudioSourceNode;
      _audioProcessingNode: ScriptProcessorNode;
      /**
       * Connects the nodes in the AudioContext to start the flow of audio data.
       *
       * @returns {void}
       */
      _connectAudioGraph(): void;
      /**
       * Disconnects the nodes in the AudioContext.
       *
       * @returns {void}
       */
      _disconnectAudioGraph(): void;
      /**
       * Cleanup potentially acquired resources.
       *
       * @returns {void}
       */
      _cleanupResources(): void;
      /**
       * Get the associated track device ID.
       *
       * @returns {string}
       */
      getDeviceId(): string;
      /**
       * Get the associated track label.
       *
       * @returns {string}
       */
      getTrackLabel(): string;
      /**
       * Start the emitter by connecting the audio graph.
       *
       * @returns {void}
       */
      start(): void;
      /**
       * Stops the emitter by disconnecting the audio graph.
       *
       * @returns {void}
       */
      stop(): void;
      /**
       * Destroy TrackVADEmitter instance (release resources and stop callbacks).
       *
       * @returns {void}
       */
      destroy(): void;
      _destroyed: boolean;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/detection/VADAudioAnalyser' {
  /**
   * Connects a TrackVADEmitter to the target conference local audio track and manages various services that use
   * the data to produce audio analytics (VADTalkMutedDetection and VADNoiseDetection).
   */
  export default class VADAudioAnalyser extends EventEmitter {
      /**
       * Creates <tt>VADAudioAnalyser</tt>
       * @param {JitsiConference} conference - JitsiConference instance that created us.
       * @param {Object} createVADProcessor - Function that creates a Voice activity detection processor. The processor
       * needs to implement the following functions:
       * - <tt>getSampleLength()</tt> - Returns the sample size accepted by getSampleLength.
       * - <tt>getRequiredPCMFrequency()</tt> - Returns the PCM frequency at which the processor operates.
       * - <tt>calculateAudioFrameVAD(pcmSample)</tt> - Process a 32 float pcm sample of getSampleLength size.
       * @constructor
       */
      constructor(conference: any, createVADProcessor: any);
      /**
       * Member function that instantiates a VAD processor.
       */
      _createVADProcessor: any;
      /**
       * Current {@link TrackVADEmitter}. VAD Emitter uses a {@link JitsiLocalTrack} and VAD processor to generate
       * period voice probability scores.
       */
      _vadEmitter: TrackVADEmitter;
      /**
       * Current state of the _vadEmitter
       */
      _isVADEmitterRunning: boolean;
      /**
       * Array of currently attached VAD processing services.
       */
      _detectionServices: any[];
      /**
       * Promise used to chain create and destroy operations associated with TRACK_ADDED and TRACK_REMOVED events
       * coming from the conference.
       * Because we have an async created component (VAD Processor) we need to make sure that it's initialized before
       * we destroy it ( when changing the device for instance), or when we use it from an external point of entry
       * i.e. (TRACK_MUTE_CHANGED event callback).
       */
      _vadInitTracker: Promise<void>;
      /**
       * Listens for {@link TrackVADEmitter} events and directs them to attached services as needed.
       *
       * @param {Object} vadScore -VAD score emitted by {@link TrackVADEmitter}
       * @param {Date}   vadScore.timestamp - Exact time at which processed PCM sample was generated.
       * @param {number} vadScore.score - VAD score on a scale from 0 to 1 (i.e. 0.7)
       * @param {Float32Array} pcmData - Raw PCM data with which the VAD score was calculated.
       * @param {string} vadScore.deviceId - Device id of the associated track.
       * @listens VAD_SCORE_PUBLISHED
       */
      _processVADScore(vadScore: {
          timestamp: Date;
          score: number;
      }): void;
      /**
       * Attach a VAD detector service to the analyser and handle it's state changes.
       *
       * @param {Object} vadTMDetector
       */
      addVADDetectionService(vadService: any): void;
      /**
       * Start the {@link TrackVADEmitter} and attach the event listener.
       * @returns {void}
       */
      _startVADEmitter(): void;
      /**
       * Stop the {@link TrackVADEmitter} and detach the event listener.
       * @returns {void}
       */
      _stopVADEmitter(): void;
      /**
       * Change the isMuted state of all attached detection services.
       *
       * @param {boolean} isMuted
       */
      _changeDetectorsMuteState(isMuted: boolean): void;
      /**
       * Notifies the detector that a track was added to the associated {@link JitsiConference}.
       * Only take into account local audio tracks.
       * @param {JitsiTrack} track - The added track.
       * @returns {void}
       * @listens TRACK_ADDED
       */
      _trackAdded(track: any): void;
      /**
       * Notifies the detector that the mute state of a {@link JitsiConference} track has changed. Only takes into account
       * local audio tracks.
       * @param {JitsiTrack} track - The track whose mute state has changed.
       * @returns {void}
       * @listens TRACK_MUTE_CHANGED
       */
      _trackMuteChanged(track: any): void;
      /**
       * Notifies the detector that a track associated with the {@link JitsiConference} was removed. Only takes into
       * account local audio tracks. Cleans up resources associated with the track and resets the processing context.
       *
       * @param {JitsiTrack} track - The removed track.
       * @returns {void}
       * @listens TRACK_REMOVED
       */
      _trackRemoved(track: any): void;
  }
  import { EventEmitter } from "events";
  import TrackVADEmitter from "@lyno/lib-jitsi-meet/modules/detection/TrackVADEmitter";

}
declare module '@lyno/lib-jitsi-meet/modules/detection/VADNoiseDetection' {
  /**
   * Detect if provided VAD score and PCM data is considered noise.
   */
  export default class VADNoiseDetection extends EventEmitter {
      /**
       * Creates <tt>VADNoiseDetection</tt>
       *
       * @constructor
       */
      constructor();
      /**
       * Flag which denotes the current state of the detection service i.e.if there is already a processing operation
       * ongoing.
       */
      _processing: boolean;
      /**
       * Buffer that keeps the VAD scores for a period of time.
       */
      _scoreArray: any[];
      /**
       * Buffer that keeps audio level samples for a period of time.
       */
      _audioLvlArray: any[];
      /**
       * Current state of the service, if it's not active no processing will occur.
       */
      _active: boolean;
      /**
       * Compute cumulative VAD score and PCM audio levels once the PROCESS_TIME_FRAME_SPAN_MS timeout has elapsed.
       * If the score is above the set threshold fire the event.
       * @returns {void}
       * @fires VAD_NOISY_DEVICE
       */
      _calculateNoisyScore(): void;
      /**
       * Record the vad score and average volume in the appropriate buffers.
       *
       * @param {number} vadScore
       * @param {number} avgAudioLvl - average audio level of the PCM sample associated with the VAD score.s
       */
      _recordValues(vadScore: number, avgAudioLvl: number): void;
      /**
       * Set the active state of the detection service and notify any listeners.
       *
       * @param {boolean} active
       * @fires DETECTOR_STATE_CHANGE
       */
      _setActiveState(active: boolean): void;
      /**
       * Change the state according to the muted status of the tracked device.
       *
       * @param {boolean} isMuted - Is the device muted or not.
       */
      changeMuteState(isMuted: boolean): void;
      /**
       * Check whether or not the service is active or not.
       *
       * @returns {boolean}
       */
      isActive(): boolean;
      /**
       * Reset the processing context, clear buffers, cancel the timeout trigger.
       *
       * @returns {void}
       */
      reset(): void;
      /**
       * Listens for {@link TrackVADEmitter} events and processes them.
       *
       * @param {Object} vadScore -VAD score emitted by {@link TrackVADEmitter}
       * @param {Date}   vadScore.timestamp - Exact time at which processed PCM sample was generated.
       * @param {number} vadScore.score - VAD score on a scale from 0 to 1 (i.e. 0.7)
       * @param {Float32Array} vadScore.pcmData - Raw PCM Data associated with the VAD score.
       * @param {string} vadScore.deviceId - Device id of the associated track.
       * @listens VAD_SCORE_PUBLISHED
       */
      processVADScore(vadScore: {
          timestamp: Date;
          score: number;
          pcmData: Float32Array;
          deviceId: string;
      }): void;
      _processTimeout: NodeJS.Timeout;
  }
  import { EventEmitter } from "events";

}
declare module '@lyno/lib-jitsi-meet/modules/detection/VADReportingService' {
  /**
   * Voice activity detection reporting service. The service create TrackVADEmitters for the provided devices and
   * publishes an average of their VAD score over the specified interval via EventEmitter.
   * The service is not reusable if destroyed a new one needs to be created, i.e. when a new device is added to the system
   * a new service needs to be created and the old discarded.
   */
  export default class VADReportingService {
      /**
       * Factory methods that creates the TrackVADEmitters for the associated array of devices and instantiates
       * a VADReportingService.
       *
       * @param {Array<MediaDeviceInfo>} micDeviceList - Device list that is monitored inside the service.
       * @param {number} intervalDelay - Delay at which to publish VAD score for monitored devices.
       * @param {Object} createVADProcessor - Function that creates a Voice activity detection processor. The processor
       * needs to implement the following functions:
       * - <tt>getSampleLength()</tt> - Returns the sample size accepted by getSampleLength.
       * - <tt>getRequiredPCMFrequency()</tt> - Returns the PCM frequency at which the processor operates.
       * - <tt>calculateAudioFrameVAD(pcmSample)</tt> - Process a 32 float pcm sample of getSampleLength size.
       *
       * @returns {Promise<VADReportingService>}
       */
      static create(micDeviceList: Array<MediaDeviceInfo>, intervalDelay: number, createVADProcessor: any): Promise<VADReportingService>;
      /**
       *
       * @param {number} intervalDelay - Delay at which to publish VAD score for monitored devices.
       *
       * @constructor
       */
      constructor(intervalDelay: number);
      /**
       * Map containing context for devices currently being monitored by the reporting service.
       */
      _contextMap: Map<any, any>;
      /**
       * State flag, check if the instance was destroyed.
       */
      _destroyed: boolean;
      /**
       * Delay at which to publish VAD score for monitored devices.
       */
      _intervalDelay: number;
      /**
       * Identifier for the interval publishing stats on the set interval.
       */
      _intervalId: NodeJS.Timeout;
      /**
       * Destroy TrackVADEmitters and clear the context map.
       *
       * @returns {void}
       */
      _clearContextMap(): void;
      /**
       * Set the watched device contexts.
       *
       * @param {Array<VADDeviceContext>} vadContextArray - List of mics.
       * @returns {void}
       */
      _setVADContextArray(vadContextArray: Array<any>): void;
      /**
       * Start the setInterval reporting process.
       *
       * @returns {void}.
       */
      _startPublish(): void;
      /**
       * Function called at set interval with selected compute. The result will be published on the set callback.
       *
       * @returns {void}
       * @fires VAD_REPORT_PUBLISHED
       */
      _reportVadScore(): void;
      /**
       * Callback method passed to vad emitters in order to publish their score.
       *
       * @param {Object} vadScore -VAD score emitted by.
       * @param {Date}   vadScore.timestamp - Exact time at which processed PCM sample was generated.
       * @param {number} vadScore.score - VAD score on a scale from 0 to 1 (i.e. 0.7).
       * @param {string} vadScore.deviceId - Device id of the associated track.
       * @returns {void}
       * @listens VAD_SCORE_PUBLISHED
       */
      _devicePublishVADScore(vadScore: {
          timestamp: Date;
          score: number;
          deviceId: string;
      }): void;
      /**
       * Destroy the VADReportingService, stops the setInterval reporting, destroys the emitters and clears the map.
       * After this call the instance is no longer usable.
       *
       * @returns {void}.
       */
      destroy(): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/detection/VADTalkMutedDetection' {
  /**
   * Detect if provided VAD score which is generated on a muted device is voice and fires an event.
   */
  export default class VADTalkMutedDetection extends EventEmitter {
      /**
       * Creates <tt>VADTalkMutedDetection</tt>
       * @constructor
       */
      constructor();
      /**
       * Flag which denotes the current state of the detection service i.e.if there is already a processing operation
       * ongoing.
       */
      _processing: boolean;
      /**
       * Buffer that keeps the VAD scores for a period of time.
       */
      _scoreArray: any[];
      /**
       * Current mute state of the audio track being monitored.
       */
      _active: boolean;
      /**
       * Compute cumulative VAD score function called once the PROCESS_TIME_FRAME_SPAN_MS timeout has elapsed.
       * @returns {void}
       * @fires VAD_TALK_WHILE_MUTED
       */
      _calculateVADScore(): void;
      /**
       * Set the active state of the detection service and notify any listeners.
       *
       * @param {boolean} active
       * @fires DETECTOR_STATE_CHANGE
       */
      _setActiveState(active: boolean): void;
      /**
       * Change the state according to the muted status of the tracked device.
       *
       * @param {boolean} isMuted - Is the device muted or not.
       */
      changeMuteState(isMuted: boolean): void;
      /**
       * Check whether or not the service is active or not.
       *
       * @returns {boolean}
       */
      isActive(): boolean;
      /**
       * Listens for {@link TrackVADEmitter} events and processes them.
       *
       * @param {Object} vadScore -VAD score emitted by {@link TrackVADEmitter}
       * @param {Date}   vadScore.timestamp - Exact time at which processed PCM sample was generated.
       * @param {number} vadScore.score - VAD score on a scale from 0 to 1 (i.e. 0.7)
       * @param {string} vadScore.deviceId - Device id of the associated track.
       * @listens VAD_SCORE_PUBLISHED
       */
      processVADScore(vadScore: {
          timestamp: Date;
          score: number;
          deviceId: string;
      }): void;
      _processTimeout: NodeJS.Timeout;
      /**
       * Reset the processing context, clear buffer, cancel the timeout trigger.
       *
       * @returns {void}
       */
      reset(): void;
  }
  import { EventEmitter } from "events";

}
declare module '@lyno/lib-jitsi-meet/modules/e2ee/Context' {
  /**
   * Per-participant context holding the cryptographic keys and
   * encode/decode functions
   */
  export class Context {
      /**
       * @param {string} id - local muc resourcepart
       */
      constructor(id: string);
      _cryptoKeyRing: any[];
      _currentKeyIndex: number;
      _sendCount: bigint;
      _id: string;
      _signatureKey: any;
      _signatureOptions: {
          name: string;
          hash: {
              name: string;
          };
          byteLength: number;
      };
      /**
       * Derives the different subkeys and starts using them for encryption or
       * decryption.
       * @param {Uint8Array|false} key bytes. Pass false to disable.
       * @param {Number} keyIndex
       */
      setKey(keyBytes: any, keyIndex: number): Promise<void>;
      /**
       * Sets a set of keys and resets the sendCount.
       * decryption.
       * @param {Object} keys set of keys.
       * @private
       */
      private _setKeys;
      /**
       * Sets the public or private key used to sign or verify frames.
       * @param {CryptoKey} public or private CryptoKey object.
       * @param {Object} signature options. Will be passed to sign/verify and need to specify byteLength of the signature.
       *  Defaults to ECDSA with SHA-256 and a byteLength of 132.
       */
      setSignatureKey(key: any, options?: {
          name: string;
          hash: {
              name: string;
          };
          byteLength: number;
      }): void;
      /**
       * Decide whether we should sign a frame.
       * @returns {boolean}
       * @private
       */
      private _shouldSignFrame;
      /**
       * Function that will be injected in a stream and will encrypt the given encoded frames.
       *
       * @param {RTCEncodedVideoFrame|RTCEncodedAudioFrame} encodedFrame - Encoded video frame.
       * @param {TransformStreamDefaultController} controller - TransportStreamController.
       *
       * The packet format is a variant of
       *   https://tools.ietf.org/html/draft-omara-sframe-00
       * using a trailer instead of a header. One of the design goals was to not require
       * changes to the SFU which for video requires not encrypting the keyframe bit of VP8
       * as SFUs need to detect a keyframe (framemarking or the generic frame descriptor will
       * solve this eventually). This also "hides" that a client is using E2EE a bit.
       *
       * Note that this operates on the full frame, i.e. for VP8 the data described in
       *   https://tools.ietf.org/html/rfc6386#section-9.1
       *
       * The VP8 payload descriptor described in
       *   https://tools.ietf.org/html/rfc7741#section-4.2
       * is part of the RTP packet and not part of the encoded frame and is therefore not
       * controllable by us. This is fine as the SFU keeps having access to it for routing.
       */
      encodeFunction(encodedFrame: any | any, controller: TransformStreamDefaultController): Promise<void>;
      /**
       * Function that will be injected in a stream and will decrypt the given encoded frames.
       *
       * @param {RTCEncodedVideoFrame|RTCEncodedAudioFrame} encodedFrame - Encoded video frame.
       * @param {TransformStreamDefaultController} controller - TransportStreamController.
       */
      decodeFunction(encodedFrame: any | any, controller: TransformStreamDefaultController): Promise<void>;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/e2ee/E2EEContext' {
  /**
   * Context encapsulating the cryptography bits required for E2EE.
   * This uses the WebRTC Insertable Streams API which is explained in
   *   https://github.com/alvestrand/webrtc-media-streams/blob/master/explainer.md
   * that provides access to the encoded frames and allows them to be transformed.
   *
   * The encoded frame format is explained below in the _encodeFunction method.
   * High level design goals were:
   * - do not require changes to existing SFUs and retain (VP8) metadata.
   * - allow the SFU to rewrite SSRCs, timestamp, pictureId.
   * - allow for the key to be rotated frequently.
   */
  export default class E2EEcontext {
      _worker: Worker;
      /**
       * Cleans up all state associated with the given participant. This is needed when a
       * participant leaves the current conference.
       *
       * @param {string} participantId - The participant that just left.
       */
      cleanup(participantId: string): void;
      /**
       * Handles the given {@code RTCRtpReceiver} by creating a {@code TransformStream} which will inject
       * a frame decoder.
       *
       * @param {RTCRtpReceiver} receiver - The receiver which will get the decoding function injected.
       * @param {string} kind - The kind of track this receiver belongs to.
       * @param {string} participantId - The participant id that this receiver belongs to.
       */
      handleReceiver(receiver: RTCRtpReceiver, kind: string, participantId: string): void;
      /**
       * Handles the given {@code RTCRtpSender} by creating a {@code TransformStream} which will inject
       * a frame encoder.
       *
       * @param {RTCRtpSender} sender - The sender which will get the encoding function injected.
       * @param {string} kind - The kind of track this sender belongs to.
       * @param {string} participantId - The participant id that this sender belongs to.
       */
      handleSender(sender: RTCRtpSender, kind: string, participantId: string): void;
      /**
       * Set the E2EE key for the specified participant.
       *
       * @param {string} participantId - the ID of the participant who's key we are setting.
       * @param {Uint8Array | boolean} key - they key for the given participant.
       * @param {Number} keyIndex - the key index.
       */
      setKey(participantId: string, key: Uint8Array | boolean, keyIndex: number): void;
      /**
       * Set the E2EE signature key for the specified participant.
       * @param {string} participantId - the ID of the participant who's key we are setting.
       * @param {CryptoKey} key - the webcrypto key to set.
       */
      setSignatureKey(participantId: string, key: CryptoKey): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/e2ee/E2EEncryption' {
  /**
   * This module integrates {@link E2EEContext} with {@link JitsiConference} in order to enable E2E encryption.
   */
  export class E2EEncryption {
      /**
       * Indicates if E2EE is supported in the current platform.
       *
       * @param {object} config - Global configuration.
       * @returns {boolean}
       */
      static isSupported(config: object): boolean;
      /**
       * A constructor.
       * @param {JitsiConference} conference - The conference instance for which E2E encryption is to be enabled.
       */
      constructor(conference: any);
      conference: any;
      _conferenceJoined: boolean;
      _enabled: boolean;
      _initialized: boolean;
      _key: any;
      _signatureKeyPair: CryptoKeyPair;
      _e2eeCtx: E2EEContext;
      _olmAdapter: OlmAdapter;
      _ratchetKey: any;
      _rotateKey: any;
      /**
       * Indicates whether E2EE is currently enabled or not.
       *
       * @returns {boolean}
       */
      isEnabled(): boolean;
      /**
       * Enables / disables End-To-End encryption.
       *
       * @param {boolean} enabled - whether E2EE should be enabled or not.
       * @returns {void}
       */
      setEnabled(enabled: boolean): void;
      /**
       * Generates a new 256 bit random key.
       *
       * @returns {Uint8Array}
       * @private
       */
      private _generateKey;
      /**
       * Setup E2EE on the new track that has been added to the conference, apply it on all the open peerconnections.
       * @param {JitsiLocalTrack} track - the new track that's being added to the conference.
       * @private
       */
      private _onLocalTrackAdded;
      /**
       * Setups E2E encryption for the new session.
       * @param {JingleSessionPC} session - the new media session.
       * @private
       */
      private _onMediaSessionStarted;
      /**
       * Publushes our own Olmn id key in presence.
       * @private
       */
      private _onOlmIdKeyReady;
      /**
       * Advances (using ratcheting) the current key when a new participant joins the conference.
       * @private
       */
      private _onParticipantJoined;
      /**
       * Rotates the current key when a participant leaves the conference.
       * @private
       */
      private _onParticipantLeft;
      /**
       * Event posted when the E2EE signalling channel has been established with the given participant.
       * @private
       */
      private _onParticipantE2EEChannelReady;
      /**
       * Handles an update in a participant's key.
       *
       * @param {string} id - The participant ID.
       * @param {Uint8Array | boolean} key - The new key for the participant.
       * @param {Number} index - The new key's index.
       * @private
       */
      private _onParticipantKeyUpdated;
      /**
       * Handles an update in a participant's presence property.
       *
       * @param {JitsiParticipant} participant - The participant.
       * @param {string} name - The name of the property that changed.
       * @param {*} oldValue - The property's previous value.
       * @param {*} newValue - The property's new value.
       * @private
       */
      private _onParticipantPropertyChanged;
      /**
       * Advances the current key by using ratcheting.
       *
       * @private
       */
      private _ratchetKeyImpl;
      /**
       * Rotates the local key. Rotating the key implies creating a new one, then distributing it
       * to all participants and once they all received it, start using it.
       *
       * @private
       */
      private _rotateKeyImpl;
      /**
       * Setup E2EE for the receiving side.
       *
       * @private
       */
      private _setupReceiverE2EEForTrack;
      /**
       * Setup E2EE for the sending side.
       *
       * @param {JingleSessionPC} session - the session which sends the media produced by the track.
       * @param {JitsiLocalTrack} track - the local track for which e2e encoder will be configured.
       * @private
       */
      private _setupSenderE2EEForTrack;
      /**
       * Setup E2EE on the sender that is created for the unmuted local video track.
       * @param {JitsiLocalTrack} track - the track for which muted status has changed.
       * @private
       */
      private _trackMuteChanged;
  }
  import E2EEContext from "@lyno/lib-jitsi-meet/modules/e2ee/E2EEContext";
  import { OlmAdapter } from "@lyno/lib-jitsi-meet/modules/e2ee/OlmAdapter";

}
declare module '@lyno/lib-jitsi-meet/modules/e2ee/OlmAdapter' {
  /**
   * This class implements an End-to-End Encrypted communication channel between every two peers
   * in the conference. This channel uses libolm to achieve E2EE.
   *
   * The created channel is then used to exchange the secret key that each participant will use
   * to encrypt the actual media (see {@link E2EEContext}).
   *
   * A simple JSON message based protocol is implemented, which follows a request - response model:
   * - session-init: Initiates an olm session establishment procedure. This message will be sent
   *                 by the participant who just joined, to everyone else.
   * - session-ack: Completes the olm session etablishment. This messsage may contain ancilliary
   *                encrypted data, more specifically the sender's current key.
   * - key-info: Includes the sender's most up to date key information.
   * - key-info-ack: Acknowledges the reception of a key-info request. In addition, it may contain
   *                 the sender's key information, if available.
   * - error: Indicates a request processing error has occurred.
   *
   * These requessts and responses are transport independent. Currently they are sent using XMPP
   * MUC private messages.
   */
  export class OlmAdapter extends Listenable {
      /**
       * Indicates if olm is supported on the current platform.
       *
       * @returns {boolean}
       */
      static isSupported(): boolean;
      /**
       * Creates an adapter instance for the given conference.
       */
      constructor(conference: any);
      _conf: any;
      _init: Deferred;
      _key: boolean | Uint8Array;
      _keyIndex: number;
      _reqs: Map<any, any>;
      /**
       * Updates the current participant key and distributes it to all participants in the conference
       * by sending a key-info message.
       *
       * @param {Uint8Array|boolean} key - The new key.
       * @returns {number}
       */
      updateCurrentKey(key: Uint8Array | boolean): number;
      /**
       * Updates the current participant key and distributes it to all participants in the conference
       * by sending a key-info message.
       *
       * @param {Uint8Array|boolean} key - The new key.
       * @retrns {Promise<Number>}
       */
      updateKey(key: Uint8Array | boolean): Promise<number>;
      /**
       * Internal helper to bootstrap the olm library.
       *
       * @returns {Promise<void>}
       * @private
       */
      private _bootstrapOlm;
      _olmAccount: any;
      _idKey: any;
      /**
       * Internal helper for encrypting the current key information for a given participant.
       *
       * @param {Olm.Session} session - Participant's session.
       * @returns {string} - The encrypted text with the key information.
       * @private
       */
      private _encryptKeyInfo;
      /**
       * Internal helper for getting the olm related data associated with a participant.
       *
       * @param {JitsiParticipant} participant - Participant whose data wants to be extracted.
       * @returns {Object}
       * @private
       */
      private _getParticipantOlmData;
      /**
       * Handles the conference joined event. Upon joining a conference, the participant
       * who just joined will start new olm sessions with every other participant.
       *
       * @private
       */
      private _onConferenceJoined;
      /**
       * Handles leaving the conference, cleaning up olm sessions.
       *
       * @private
       */
      private _onConferenceLeft;
      /**
       * Main message handler. Handles 1-to-1 messages received from other participants
       * and send the appropriate replies.
       *
       * @private
       */
      private _onEndpointMessageReceived;
      /**
       * Handles a participant leaving. When a participant leaves their olm session is destroyed.
       *
       * @private
       */
      private _onParticipantLeft;
      /**
       * Builds and sends an error message to the target participant.
       *
       * @param {JitsiParticipant} participant - The target participant.
       * @param {string} error - The error message.
       * @returns {void}
       */
      _sendError(participant: any, error: string): void;
      /**
       * Internal helper to send the given object to the given participant ID.
       * This function merely exists so the transport can be easily swapped.
       * Currently messages are transmitted via XMPP MUC private messages.
       *
       * @param {object} data - The data that will be sent to the target participant.
       * @param {string} participantId - ID of the target participant.
       */
      _sendMessage(data: object, participantId: string): void;
      /**
       * Builds and sends the session-init request to the target participant.
       *
       * @param {JitsiParticipant} participant - Participant to whom we'll send the request.
       * @returns {Promise} - The promise will be resolved when the session-ack is received.
       * @private
       */
      private _sendSessionInit;
  }
  export namespace OlmAdapter {
      export { OlmAdapterEvents as events };
  }
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";
  import Deferred from "@lyno/lib-jitsi-meet/modules/util/Deferred";
  namespace OlmAdapterEvents {
      const OLM_ID_KEY_READY: string;
      const PARTICIPANT_E2EE_CHANNEL_READY: string;
      const PARTICIPANT_KEY_UPDATED: string;
  }
  export {};

}
declare module '@lyno/lib-jitsi-meet/modules/e2ee/Worker' {
  export {};

}
declare module '@lyno/lib-jitsi-meet/modules/e2ee/crypto-utils' {
  /**
   * Derives a set of keys from the master key.
   * @param {CryptoKey} material - master key to derive from
   *
   * See https://tools.ietf.org/html/draft-omara-sframe-00#section-4.3.1
   */
  export function deriveKeys(material: CryptoKey): Promise<{
      material: CryptoKey;
      encryptionKey: CryptoKey;
      authenticationKey: CryptoKey;
      saltKey: ArrayBuffer;
  }>;
  /**
   * Ratchets a key. See
   * https://tools.ietf.org/html/draft-omara-sframe-00#section-4.3.5.1
   * @param {CryptoKey} material - base key material
   * @returns {ArrayBuffer} - ratcheted key material
   */
  export function ratchet(material: CryptoKey): ArrayBuffer;
  /**
   * Converts a raw key into a WebCrypto key object with default options
   * suitable for our usage.
   * @param {ArrayBuffer} keyBytes - raw key
   * @param {Array} keyUsages - key usages, see importKey documentation
   * @returns {CryptoKey} - the WebCrypto key.
   */
  export function importKey(keyBytes: ArrayBuffer): CryptoKey;

}
declare module '@lyno/lib-jitsi-meet/modules/e2ee/utils' {
  /**
   * Polyfill RTCEncoded(Audio|Video)Frame.getMetadata() (not available in M83, available M84+).
   * The polyfill can not be done on the prototype since its not exposed in workers. Instead,
   * it is done as another transformation to keep it separate.
   * TODO: remove when we decode to drop M83 support.
   */
  export function polyFillEncodedFrameMetadata(encodedFrame: any, controller: any): void;
  /**
   * Compares two byteArrays for equality.
   */
  export function isArrayEqual(a1: any, a2: any): boolean;

}
declare module '@lyno/lib-jitsi-meet/modules/e2eping/e2eping' {
  /**
   * Implements end-to-end ping (from one conference participant to another) via
   * the jitsi-videobridge channel (either WebRTC data channel or web socket).
   *
   * TODO: use a broadcast message instead of individual pings to each remote
   * participant.
   *
   * This class:
   * 1. Sends periodic ping requests to all other participants in the
   * conference.
   * 2. Responds to ping requests from other participants.
   * 3. Fires events with the end-to-end RTT to each participant whenever a
   * response is received.
   * 4. Fires analytics events with the end-to-end RTT periodically.
   */
  export default class E2ePing {
      /**
       * @param {JitsiConference} conference - The conference.
       * @param {Function} sendMessage - The function to use to send a message.
       * @param {Object} options
       */
      constructor(conference: any, options: any, sendMessage: Function);
      conference: any;
      eventEmitter: any;
      sendMessage: Function;
      pingIntervalMs: any;
      analyticsIntervalMs: any;
      participants: {};
      isDataChannelOpen: boolean;
      /**
       * Handles a participant joining the conference. Starts to send ping
       * requests to the participant.
       *
       * @param {String} id - The ID of the participant.
       * @param {JitsiParticipant} participant - The participant that joined.
       */
      participantJoined(id: string, participant: any): void;
      /**
       * Handles a participant leaving the conference. Stops sending requests.
       *
       * @param {String} id - The ID of the participant.
       */
      participantLeft(id: string): void;
      /**
       * Handles a message that was received.
       *
       * @param participant - The message sender.
       * @param payload - The payload of the message.
       */
      messageReceived(participant: any, payload: any): void;
      /**
       * Notifies this instance that the communications channel has been opened
       * and it can now send messages via sendMessage.
       */
      dataChannelOpened(): void;
      /**
       * Handles a ping request coming from another participant.
       *
       * @param {string} participantId - The ID of the participant who sent the
       * request.
       * @param {Object} request - The request.
       */
      handleRequest(participantId: string, request: any): void;
      /**
       * Handles a ping response coming from another participant
       * @param {string} participantId - The ID of the participant who sent the
       * response.
       * @param {Object} response - The response.
       */
      handleResponse(participantId: string, response: any): void;
      /**
       * Stops this E2ePing (i.e. stop sending requests).
       */
      stop(): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/event/Jvb121EventGenerator' {
  /**
   * Emits {@link JitsiConferenceEvents.JVB121_STATUS} events based on the current
   * P2P status and the conference participants count. See the event description
   * for more info.
   */
  export default class Jvb121EventGenerator {
      /**
       * Creates new <tt>Jvb121EventGenerator</tt> for the given conference.
       * @param {JitsiConference} conference
       */
      constructor(conference: any);
      _conference: any;
      /**
       * Indicates whether it's a one to one JVB conference (<tt>true</tt>)
       * or a multiparty (<tt>false</tt>). Will be also <tt>false</tt> if
       * the conference is currently in the P2P mode.
       * @type {boolean}
       * @private
       */
      private _jvb121;
      /**
       * Checks whether the JVB121 value should be updated and a new event
       * emitted.
       */
      evaluateStatus(): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/proxyconnection/ProxyConnectionPC' {
  /**
   * An adapter around {@code JingleSessionPC} so its logic can be re-used without
   * an XMPP connection. It is being re-used for consistency with the rest of the
   * codebase and to leverage existing peer connection event handling. Also
   * this class provides a facade to hide most of the API for
   * {@code JingleSessionPC}.
   */
  export default class ProxyConnectionPC {
      /**
       * Initializes a new {@code ProxyConnectionPC} instance.
       *
       * @param {Object} options - Values to initialize the instance with.
       * @param {Object} [options.iceConfig] - The {@code RTCConfiguration} to use
       * for the peer connection.
       * @param {boolean} [options.isInitiator] - If true, the local client should
       * send offers. If false, the local client should send answers. Defaults to
       * false.
       * @param {Function} options.onRemoteStream - Callback to invoke when a
       * remote media stream has been received through the peer connection.
       * @param {string} options.peerJid - The jid of the remote client with which
       * the peer connection is being establish and which should receive direct
       * messages regarding peer connection updates.
       * @param {boolean} [options.receiveVideo] - Whether or not the peer
       * connection should accept incoming video streams. Defaults to false.
       * @param {Function} options.onSendMessage - Callback to invoke when a
       * message has to be sent (signaled) out.
       */
      constructor(options?: {
          iceConfig?: any;
      });
      _options: {
          iceConfig: any;
          isInitiator: boolean;
          receiveAudio: boolean;
          receiveVideo: boolean;
      };
      /**
       * Instances of {@code JitsiTrack} associated with this instance of
       * {@code ProxyConnectionPC}.
       *
       * @type {Array<JitsiTrack>}
       */
      _tracks: Array<any>;
      /**
       * The active instance of {@code JingleSessionPC}.
       *
       * @type {JingleSessionPC|null}
       */
      _peerConnection: JingleSessionPC | null;
      /**
       * Invoked when a connection related issue has been encountered.
       *
       * @param {string} errorType - The constant indicating the type of the error
       * that occured.
       * @param {string} details - Optional additional data about the error.
       * @private
       * @returns {void}
       */
      private _onError;
      /**
       * Callback invoked when the peer connection has received a remote media
       * stream.
       *
       * @param {JitsiRemoteTrack} jitsiRemoteTrack - The remote media stream
       * wrapped in {@code JitsiRemoteTrack}.
       * @private
       * @returns {void}
       */
      private _onRemoteStream;
      /**
       * Callback invoked when {@code JingleSessionPC} needs to signal a message
       * out to the remote peer.
       *
       * @param {XML} iq - The message to signal out.
       * @private
       * @returns {void}
       */
      private _onSendMessage;
      /**
       * Returns the jid of the remote peer with which this peer connection should
       * be established with.
       *
       * @returns {string}
       */
      getPeerJid(): string;
      /**
       * Updates the peer connection based on the passed in jingle.
       *
       * @param {Object} $jingle - An XML jingle element, wrapped in query,
       * describing how the peer connection should be updated.
       * @returns {void}
       */
      processMessage($jingle: any): void;
      /**
       * Instantiates a peer connection and starts the offer/answer cycle to
       * establish a connection with a remote peer.
       *
       * @param {Array<JitsiLocalTrack>} localTracks - Initial local tracks to add
       * to add to the peer connection.
       * @returns {void}
       */
      start(localTracks?: Array<any>): void;
      /**
       * Begins the process of disconnecting from a remote peer and cleaning up
       * the peer connection.
       *
       * @returns {void}
       */
      stop(): void;
      /**
       * Instantiates a new {@code JingleSessionPC} by stubbing out the various
       * dependencies of {@code JingleSessionPC}.
       *
       * @private
       * @returns {JingleSessionPC}
       */
      private _createPeerConnection;
      /**
       * Create an instance of {@code RTC} as it is required for peer
       * connection creation by {@code JingleSessionPC}. An existing instance
       * of {@code RTC} from elsewhere should not be re-used because it is
       * a stateful grouping of utilities.
       */
      _rtc: RTC;
      /**
       * Callback invoked in response to an agreement to start a proxy connection.
       * The passed in jingle element should contain an SDP answer to a previously
       * sent SDP offer.
       *
       * @param {Object} $jingle - The jingle element wrapped in jQuery.
       * @private
       * @returns {void}
       */
      private _onSessionAccept;
      /**
       * Callback invoked in response to a request to start a proxy connection.
       * The passed in jingle element should contain an SDP offer.
       *
       * @param {Object} $jingle - The jingle element wrapped in jQuery.
       * @private
       * @returns {void}
       */
      private _onSessionInitiate;
      /**
       * Callback invoked in response to a request to disconnect an active proxy
       * connection. Cleans up tracks and the peer connection.
       *
       * @private
       * @returns {void}
       */
      private _onSessionTerminate;
      /**
       * Callback invoked in response to ICE candidates from the remote peer.
       * The passed in jingle element should contain an ICE candidate.
       *
       * @param {Object} $jingle - The jingle element wrapped in jQuery.
       * @private
       * @returns {void}
       */
      private _onTransportInfo;
  }
  import JingleSessionPC from "@lyno/lib-jitsi-meet/modules/xmpp/JingleSessionPC";
  import RTC from "@lyno/lib-jitsi-meet/modules/RTC/RTC";

}
declare module '@lyno/lib-jitsi-meet/modules/proxyconnection/ProxyConnectionService' {
  /**
   * Instantiates a new ProxyConnectionPC and ensures only one exists at a given
   * time. Currently it assumes ProxyConnectionPC is used only for screensharing
   * and assumes IQs to be used for communication.
   */
  export default class ProxyConnectionService {
      /**
       * Initializes a new {@code ProxyConnectionService} instance.
       *
       * @param {Object} options - Values to initialize the instance with.
       * @param {boolean} [options.convertVideoToDesktop] - Whether or not proxied
       * video should be returned as a desktop stream. Defaults to false.
       * @param {Object} [options.iceConfig] - The {@code RTCConfiguration} to use
       * for the peer connection.
       * @param {JitsiConnection} [options.jitsiConnection] - The
       * {@code JitsiConnection} which will be used to fetch TURN credentials for
       * the P2P connection.
       * @param {Function} options.onRemoteStream - Callback to invoke when a
       * remote video stream has been received and converted to a
       * {@code JitsiLocakTrack}. The {@code JitsiLocakTrack} will be passed in.
       * @param {Function} options.onSendMessage - Callback to invoke when a
       * message has to be sent (signaled) out. The arguments passed in are the
       * jid to send the message to and the message
       */
      constructor(options?: {
          convertVideoToDesktop?: boolean;
          iceConfig?: any;
      });
      /**
       * Holds a reference to the collection of all callbacks.
       *
       * @type {Object}
       */
      _options: any;
      /**
       * The active instance of {@code ProxyConnectionService}.
       *
       * @type {ProxyConnectionPC|null}
       */
      _peerConnection: ProxyConnectionPC | null;
      /**
       * Callback invoked when an error occurs that should cause
       * {@code ProxyConnectionPC} to be closed if the peer is currently
       * connected. Sends an error message/reply back to the peer.
       *
       * @param {string} peerJid - The peer jid with which the connection was
       * attempted or started, and to which an iq with error details should be
       * sent.
       * @param {string} errorType - The constant indicating the type of the error
       * that occured.
       * @param {string} details - Optional additional data about the error.
       * @private
       * @returns {void}
       */
      private _onFatalError;
      /**
       * Formats and forwards a message an iq to be sent to a peer jid.
       *
       * @param {string} peerJid - The jid the iq should be sent to.
       * @param {Object} iq - The iq which would be sent to the peer jid.
       * @private
       * @returns {void}
       */
      private _onSendMessage;
      /**
       * Callback invoked when the remote peer of the {@code ProxyConnectionPC}
       * has offered a media stream. The stream is converted into a
       * {@code JitsiLocalTrack} for local usage if the {@code onRemoteStream}
       * callback is defined.
       *
       * @param {JitsiRemoteTrack} jitsiRemoteTrack - The {@code JitsiRemoteTrack}
       * for the peer's media stream.
       * @private
       * @returns {void}
       */
      private _onRemoteStream;
      /**
       * Parses a message object regarding a proxy connection to create a new
       * proxy connection or update and existing connection.
       *
       * @param {Object} message - A message object regarding establishing or
       * updating a proxy connection.
       * @param {Object} message.data - An object containing additional message
       * details.
       * @param {string} message.data.iq - The stringified iq which explains how
       * and what to update regarding the proxy connection.
       * @param {string} message.from - The message sender's full jid. Used for
       * sending replies.
       * @returns {void}
       */
      processMessage(message: {
          data: {
              iq: string;
          };
          from: string;
      }): void;
      /**
       * Instantiates and initiates a proxy peer connection.
       *
       * @param {string} peerJid - The jid of the remote client that should
       * receive messages.
       * @param {Array<JitsiLocalTrack>} localTracks - Initial media tracks to
       * send through to the peer.
       * @returns {void}
       */
      start(peerJid: string, localTracks?: Array<any>): void;
      /**
       * Terminates any active proxy peer connection.
       *
       * @returns {void}
       */
      stop(): void;
      /**
       * Transforms a stringified xML into a XML wrapped in jQuery.
       *
       * @param {string} xml - The XML in string form.
       * @private
       * @returns {Object|null} A jQuery version of the xml. Null will be returned
       * if an error is encountered during transformation.
       */
      private _convertStringToXML;
      /**
       * Helper for creating an instance of {@code ProxyConnectionPC}.
       *
       * @param {string} peerJid - The jid of the remote peer with which the
       * {@code ProxyConnectionPC} will be established with.
       * @param {Object} options - Additional defaults to instantiate the
       * {@code ProxyConnectionPC} with. See the constructor of ProxyConnectionPC
       * for more details.
       * @private
       * @returns {ProxyConnectionPC}
       */
      private _createPeerConnection;
      /**
       * Invoked when preemptively closing the {@code ProxyConnectionPC}.
       *
       * @private
       * @returns {void}
       */
      private _selfCloseConnection;
  }
  import ProxyConnectionPC from "@lyno/lib-jitsi-meet/modules/proxyconnection/ProxyConnectionPC";

}
declare module '@lyno/lib-jitsi-meet/modules/proxyconnection/constants' {
  export namespace ACTIONS {
      const ACCEPT: string;
      const CONNECTION_ERROR: string;
      const INITIATE: string;
      const TERMINATE: string;
      const TRANSPORT_INFO: string;
      const UNAVAILABLE: string;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/qualitycontrol/QualityController' {
  /**
   * The class manages send and receive video constraints across media sessions({@link JingleSessionPC}) which belong to
   * {@link JitsiConference}. It finds the lowest common value, between the local user's send preference and
   * the remote party's receive preference. Also this module will consider only the active session's receive value,
   * because local tracks are shared and while JVB may have no preference, the remote p2p may have and they may be totally
   * different.
   */
  export class QualityController {
      /**
       * Creates new instance for a given conference.
       *
       * @param {JitsiConference} conference - the conference instance for which the new instance will be managing
       * the quality constraints.
       */
      constructor(conference: any);
      conference: any;
      /**
       * Handles the {@link JitsiConferenceEvents.MEDIA_SESSION_STARTED}, that is when the conference creates new media
       * session. It doesn't mean it's already active though. For example the JVB connection may be created after
       * the conference has entered the p2p mode already.
       *
       * @param {JingleSessionPC} mediaSession - the started media session.
       * @private
       */
      private _onMediaSessionStarted;
      /**
       * Figures out the send video constraint as specified by {@link selectSendMaxFrameHeight} and sets it on all media
       * sessions for the reasons mentioned in this class description.
       *
       * @returns {Promise<void[]>}
       * @private
       */
      private _propagateSendMaxFrameHeight;
      /**
       * Selects the lowest common value for the local video send constraint by looking at local user's preference and
       * the active media session's receive preference set by the remote party.
       *
       * @returns {number|undefined}
       */
      selectSendMaxFrameHeight(): number | undefined;
      /**
       * Sets local preference for max receive video frame height.
       * @param {number|undefined} maxFrameHeight - the new value.
       */
      setPreferredReceiveMaxFrameHeight(maxFrameHeight: number | undefined): void;
      preferredReceiveMaxFrameHeight: number;
      /**
       * Sets local preference for max send video frame height.
       *
       * @param {number} maxFrameHeight - the new value to set.
       * @returns {Promise<void[]>} - resolved when the operation is complete.
       */
      setPreferredSendMaxFrameHeight(maxFrameHeight: number): Promise<void[]>;
      preferredSendMaxFrameHeight: number;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/recording/JibriSession' {
  /**
   * Represents a recording session.
   */
  export default class JibriSession {
      /**
       * Initializes a new JibriSession instance.
       *
       * @constructor
       */
      constructor(options?: {});
      _connection: any;
      _mode: any;
      /**
       * Returns the error related to the session instance, if any.
       *
       * @returns {string|undefined}
       */
      getError(): string | undefined;
      /**
       * Returns the session ID of the session instance.
       *
       * @returns {string|undefined}
       */
      getID(): string | undefined;
      /**
       * Returns the initiator of the session instance.
       *
       * @returns {JitsiParticipant|undefined} The participant that started the session.
       */
      getInitiator(): any | undefined;
      /**
       * Returns the streaming URL of the session.
       *
       * @returns {string|undefined}
       */
      getLiveStreamViewURL(): string | undefined;
      /**
       * Returns the current status of the session.
       *
       * @returns {string|undefined}
       */
      getStatus(): string | undefined;
      /**
       * Returns the jid of the participant that stopped the session.
       *
       * @returns {JitsiParticipant|undefined} The participant that stopped the session.
       */
      getTerminator(): any | undefined;
      /**
       * Returns the current recording mode of the session, such as "file".
       *
       * @returns {string}
       */
      getMode(): string;
      /**
       * Sets the last known error message related to the session.
       *
       * @param {string} error - The error string explaining why the session
       * entered an error state.
       * @returns {void}
       */
      setError(error: string): void;
      _error: string;
      /**
       * Sets the last live stream URL for the session instance. Usually this is
       * a YouTube URL and usually this is only set for "stream" sessions.
       *
       * @param {string} url - The live stream URL associated with the session.
       * @returns {void}
       */
      setLiveStreamViewURL(url: string): void;
      _liveStreamViewURL: string;
      /**
       * Sets the last known status for this recording session.
       *
       * @param {string} status - The new status to set.
       * @returns {void}
       */
      setStatus(status: string): void;
      _status: string;
      /**
       * Sets the creator's jid of the session.
       * @param {JitsiParticipant} participant - The creator of the session.
       */
      setInitiator(participant: any): void;
      _initiator: any;
      /**
       * Sets the jid of the participant that stopped the session.
       * @param {JitsiParticipant} participant  - The participant's jid,
       * that stopped the session.
       */
      setTerminator(participant: any): void;
      _terminator: any;
      /**
       * Sends a message to start the actual recording.
       *
       * @param {Object} options - Additional arguments for starting the
       * recording.
       * @param {string} [options.appData] - Data specific to the app/service that
       * the result file will be uploaded.
       * @param {string} [options.broadcastId] - The broadcast ID of an
       * associated YouTube stream, used for knowing the URL from which the stream
       * can be viewed.
       * @param {string} options.focusMucJid - The JID of the focus participant
       * that controls recording.
       * @param {streamId} options.streamId - Necessary for live streaming, this
       * is the stream key needed to start a live streaming session with the
       * streaming service provider.
       * @returns Promise
       */
      start({ appData, broadcastId, focusMucJid, streamId }: {
          appData?: string;
          broadcastId?: string;
          focusMucJid: string;
          streamId: any;
      }): Promise<any>;
      /**
       * Sends a message to actually stop the recording session.
       *
       * @param {Object} options - Additional arguments for stopping the
       * recording.
       * @param {Object} options.focusMucJid - The JID of the focus participant
       * that controls recording.
       * @returns Promise
       */
      stop({ focusMucJid }: {
          focusMucJid: any;
      }): Promise<any>;
      /**
       * Generates the message to change the status of the recording session.
       *
       * @param {string} status - The new status to which the recording session
       * should transition.
       * @param {string} [options.appData] - Data specific to the app/service that
       * the result file will be uploaded.
       * @param {string} [options.broadcastId] - The broadcast ID of an
       * associated YouTube stream, used for knowing the URL from which the stream
       * can be viewed.
       * @param {string} options.focusMucJid - The JID of the focus participant
       * that controls recording.
       * @param {streamId} options.streamId - Necessary for live streaming, this
       * is the stream key needed to start a live streaming session with the
       * streaming service provider.
       * @returns Object - The XMPP IQ message.
       */
      _createIQ({ action, appData, broadcastId, focusMucJid, streamId }: string): any;
      /**
       * Handles the error from an iq and stores the error.
       *
       * @param {Node} errorIq - The error response from an Iq.
       * @private
       * @returns {void}
       */
      private _setErrorFromIq;
      /**
       * Sets the known session ID for this recording session.
       *
       * @param {string} sessionID
       * @private
       * @returns {void}
       */
      private _setSessionID;
      _sessionID: string;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/recording/RecordingManager' {
  export default RecordingManager;
  /**
   * A class responsible for starting and stopping recording sessions and emitting
   * state updates for them.
   */
  class RecordingManager {
      /**
       * Initialize {@code RecordingManager} with other objects that are necessary
       * for starting a recording.
       *
       * @param {ChatRoom} chatRoom - The chat room to handle.
       * @returns {void}
       */
      constructor(chatRoom: any);
      /**
       * All known recording sessions from the current conference.
       */
      _sessions: {};
      _chatRoom: any;
      /**
       * Callback to invoke to parse through a presence update to find recording
       * related updates (from Jibri participant doing the recording and the
       * focus which controls recording).
       *
       * @param {Object} event - The presence data from the pubsub event.
       * @param {Node} event.presence - An XMPP presence update.
       * @param {boolean} event.fromHiddenDomain - Whether or not the update comes
       * from a participant that is trusted but not visible, as would be the case
       * with the Jibri recorder participant.
       * @returns {void}
       */
      onPresence({ fromHiddenDomain, presence }: {
          presence: Node;
          fromHiddenDomain: boolean;
      }): void;
      /**
       * Finds an existing recording session by session ID.
       *
       * @param {string} sessionID - The session ID associated with the recording.
       * @returns {JibriSession|undefined}
       */
      getSession(sessionID: string): JibriSession | undefined;
      /**
       * Start a recording session.
       *
       * @param {Object} options - Configuration for the recording.
       * @param {string} [options.appData] - Data specific to the app/service that
       * the result file will be uploaded.
       * @param {string} [optional] options.broadcastId - The channel on which a
       * live stream will occur.
       * @param {string} options.mode - The mode in which recording should be
       * started. Recognized values are "file" and "stream".
       * @param {string} [optional] options.streamId - The stream key to be used
       * for live stream broadcasting. Required for live streaming.
       * @returns {Promise} A promise for starting a recording, which will pass
       * back the session on success. The promise resolves after receiving an
       * acknowledgment of the start request success or fail.
       */
      startRecording(options: {
          appData?: string;
      }): Promise<any>;
      /**
       * Stop a recording session.
       *
       * @param {string} sessionID - The ID associated with the recording session
       * to be stopped.
       * @returns {Promise} The promise resolves after receiving an
       * acknowledgment of the stop request success or fail.
       */
      stopRecording(sessionID: string): Promise<any>;
      /**
       * Stores a reference to the passed in JibriSession.
       *
       * @param {string} session - The JibriSession instance to store.
       * @returns {void}
       */
      _addSession(session: string): void;
      /**
       * Create a new instance of a recording session and stores a reference to
       * it.
       *
       * @param {string} sessionID - The session ID of the recording in progress.
       * @param {string} status - The current status of the recording session.
       * @param {string} mode - The recording mode of the session.
       * @returns {JibriSession}
       */
      _createSession(sessionID: string, status: string, mode: string): JibriSession;
      /**
       * Notifies listeners of an update to a recording session.
       *
       * @param {JibriSession} session - The session that has been updated.
       * @param {string|undefined} initiator - The jid of the initiator of the update.
       */
      _emitSessionUpdate(session: JibriSession, initiator: string | undefined): void;
      /**
       * Parses presence to update an existing JibriSession or to create a new
       * JibriSession.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {void}
       */
      _handleFocusPresence(presence: Node): void;
      /**
       * Handles updates from the Jibri which can broadcast a YouTube URL that
       * needs to be updated in a JibriSession.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {void}
       */
      _handleJibriPresence(presence: Node): void;
  }
  import JibriSession from "@lyno/lib-jitsi-meet/modules/recording/JibriSession";

}
declare module '@lyno/lib-jitsi-meet/modules/recording/recordingConstants' {
  namespace _default {
      namespace error {
          const BUSY: string;
          const ERROR: string;
          const RESOURCE_CONSTRAINT: string;
          const SERVICE_UNAVAILABLE: string;
      }
      namespace mode {
          const FILE: string;
          const STREAM: string;
      }
      namespace status {
          const OFF: string;
          const ON: string;
          const PENDING: string;
      }
  }
  export default _default;

}
declare module '@lyno/lib-jitsi-meet/modules/recording/recordingXMLUtils' {
  namespace _default {
      /**
       * Parses the presence update of the focus and returns an object with the
       * statuses related to recording.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {Object} The current presence values related to recording.
       */
      function getFocusRecordingUpdate(presence: Node): any;
      /**
       * Parses the presence update of the focus and returns an object with the
       * statuses related to recording.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {Object} The current presence values related to recording.
       */
      function getFocusRecordingUpdate(presence: Node): any;
      /**
       * Parses the presence update from a hidden domain participant and returns
       * an object with the statuses related to recording.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {Object} The current presence values related to recording.
       */
      function getHiddenDomainUpdate(presence: Node): any;
      /**
       * Parses the presence update from a hidden domain participant and returns
       * an object with the statuses related to recording.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {Object} The current presence values related to recording.
       */
      function getHiddenDomainUpdate(presence: Node): any;
      /**
       * Returns the recording session ID from a successful IQ.
       *
       * @param {Node} response - The response from the IQ.
       * @returns {string} The session ID of the recording session.
       */
      function getSessionIdFromIq(response: Node): string;
      /**
       * Returns the recording session ID from a successful IQ.
       *
       * @param {Node} response - The response from the IQ.
       * @returns {string} The session ID of the recording session.
       */
      function getSessionIdFromIq(response: Node): string;
      /**
       * Returns the recording session ID from a presence, if it exists.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {string|undefined} The session ID of the recording session.
       */
      function getSessionId(presence: Node): string;
      /**
       * Returns the recording session ID from a presence, if it exists.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {string|undefined} The session ID of the recording session.
       */
      function getSessionId(presence: Node): string;
      /**
       * Returns whether or not a presence is from the focus.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {boolean} True if the presence is from the focus.
       */
      function isFromFocus(presence: Node): boolean;
      /**
       * Returns whether or not a presence is from the focus.
       *
       * @param {Node} presence - An XMPP presence update.
       * @returns {boolean} True if the presence is from the focus.
       */
      function isFromFocus(presence: Node): boolean;
  }
  export default _default;

}
declare module '@lyno/lib-jitsi-meet/modules/settings/Settings' {
  namespace _default {
      export { jitsiLocalStorage as _storage };
      /**
       * Initializes the Settings class.
       *
       * @param {Storage|undefined} externalStorage - Object that implements the Storage interface. This object will be
       * used for storing data instead of jitsiLocalStorage if specified.
       */
      export function init(externalStorage: Storage): void;
      /**
       * Initializes the Settings class.
       *
       * @param {Storage|undefined} externalStorage - Object that implements the Storage interface. This object will be
       * used for storing data instead of jitsiLocalStorage if specified.
       */
      export function init(externalStorage: Storage): void;
  }
  export default _default;

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/AnalyticsAdapter' {
  var _default: AnalyticsAdapter;
  export default _default;
  /**
   * This class provides an API to lib-jitsi-meet and its users for sending
   * analytics events. It serves as a bridge to different backend implementations
   * ("analytics handlers") and a cache for events attempted to be sent before
   * the analytics handlers were enabled.
   *
   * The API is designed to be an easy replacement for the previous version of
   * this adapter, and is meant to be extended with more convenience methods.
   *
   *
   * The API calls are translated to objects with the following structure, which
   * are then passed to the sendEvent(event) function of the underlying handlers:
   *
   * {
   *    type,
   *
   *    action,
   *    actionSubject,
   *    actionSubjectId,
   *    attributes,
   *    categories,
   *    containerId,
   *    containerType,
   *    name,
   *    objectId,
   *    objectType,
   *    source,
   *    tags
   * }
   *
   * The 'type' is one of 'operational', 'page', 'track' or 'ui', and some of the
   * other properties are considered required according to the type.
   *
   * For events with type 'page', the required properties are: name.
   *
   * For events with type 'operational' and 'ui', the required properties are:
   * action, actionSubject, source
   *
   * For events with type 'page', the required properties are:
   * action, actionSubject, source, containerType, containerId, objectType,
   * objectId
   */
  class AnalyticsAdapter {
      /**
       * Reset the state to the initial one.
       *
       * @returns {void}
       */
      reset(): void;
      /**
       * Whether this AnalyticsAdapter has been disposed of or not. Once this
       * is set to true, the AnalyticsAdapter is disabled and does not accept
       * any more events, and it can not be re-enabled.
       * @type {boolean}
       */
      disposed: boolean;
      /**
       * The set of handlers to which events will be sent.
       * @type {Set<any>}
       */
      analyticsHandlers: Set<any>;
      /**
       * The cache of events which are not sent yet. The cache is enabled
       * while this field is truthy, and disabled otherwise.
       * @type {Array}
       */
      cache: any[];
      /**
       * Map of properties that will be added to every event. Note that the
       * keys will be prefixed with "permanent.".
       */
      permanentProperties: any;
      /**
       * The name of the conference that this AnalyticsAdapter is associated
       * with.
       * @type {null}
       */
      conferenceName: any;
      /**
       * Dispose analytics. Clears all handlers.
       */
      dispose(): void;
      /**
       * Sets the handlers that are going to be used to send analytics. Sends any
       * cached events.
       * @param {Array} handlers the handlers
       */
      setAnalyticsHandlers(handlers: any[]): void;
      /**
       * Set the user properties to the analytics handlers.
       *
       * @returns {void}
       */
      _setUserProperties(): void;
      /**
       * Adds a set of permanent properties to this this AnalyticsAdapter.
       * Permanent properties will be added as "attributes" to events sent to
       * the underlying "analytics handlers", and their keys will be prefixed
       * by "permanent_", i.e. adding a permanent property {key: "value"} will
       * result in {"permanent_key": "value"} object to be added to the
       * "attributes" field of events.
       *
       * @param {Object} properties the properties to add
       */
      addPermanentProperties(properties: any): void;
      /**
       * Sets the name of the conference that this AnalyticsAdapter is associated
       * with.
       * @param name the name to set.
       */
      setConferenceName(name: any): void;
      /**
       * Sends an event with a given name and given properties. The first
       * parameter is either a string or an object. If it is a string, it is used
       * as the event name and the second parameter is used at the attributes to
       * attach to the event. If it is an object, it represents the whole event,
       * including any desired attributes, and the second parameter is ignored.
       *
       * @param {String|Object} eventName either a string to be used as the name
       * of the event, or an event object. If an event object is passed, the
       * properties parameters is ignored.
       * @param {Object} properties the properties/attributes to attach to the
       * event, if eventName is a string.
       */
      sendEvent(eventName: string | any, properties?: any): void;
      /**
       * Checks whether an event has all of the required fields set, and tries
       * to fill in some of the missing fields with reasonable default values.
       * Returns true if after this operation the event has all of the required
       * fields set, and false otherwise (if some of the required fields were not
       * set and the attempt to fill them in with a default failed).
       *
       * @param event the event object.
       * @return {boolean} true if the event (after the call to this function)
       * contains all of the required fields, and false otherwise.
       * @private
       */
      private _verifyRequiredFields;
      /**
       * Saves an event to the cache, if the cache is enabled.
       * @param event the event to save.
       * @returns {boolean} true if the event was saved, and false otherwise (i.e.
       * if the cache was disabled).
       * @private
       */
      private _maybeCacheEvent;
      /**
       *
       * @param event
       * @private
       */
      private _sendEvent;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/AudioOutputProblemDetector' {
  /**
   * Collects the average audio levels per participant from the local stats and the stats received by every remote
   * participant and compares them to detect potential audio problem for a participant.
   */
  export default class AudioOutputProblemDetector {
      /**
       * Creates new <tt>AudioOutputProblemDetector</tt> instance.
       *
       * @param {JitsiCofnerence} conference - The conference instance to be monitored.
       */
      constructor(conference: any);
      _conference: any;
      _localAudioLevelCache: {};
      _reportedParticipants: any[];
      _audioProblemCandidates: {};
      _numberOfRemoteAudioLevelsReceived: {};
      /**
       * A listener for audio level data retrieved by the local stats.
       *
       * @param {TraceablePeerConnection} tpc - The <tt>TraceablePeerConnection</tt> instance used to gather the data.
       * @param {Object} avgAudioLevels - The average audio levels per participant.
       * @returns {void}
       */
      _onLocalAudioLevelsReport(tpc: any, { avgAudioLevels }: any): void;
      /**
       * A listener for audio level data received by a remote participant.
       *
       * @param {string} userID - The user id of the participant that sent the data.
       * @param {number} audioLevel - The average audio level value.
       * @returns {void}
       */
      _onRemoteAudioLevelReceived(userID: string, { avgAudioLevels }: number): void;
      /**
       * Clears the data stored for a participant.
       *
       * @param {string} userID - The id of the participant.
       * @returns {void}
       */
      _clearUserData(userID: string): void;
      /**
       * Disposes the allocated resources.
       *
       * @returns {void}
       */
      dispose(): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/AvgRTPStatsReporter' {
  /**
   * Reports average RTP statistics values (arithmetic mean) to the analytics
   * module for things like bit rate, bandwidth, packet loss etc. It keeps track
   * of the P2P vs JVB conference modes and submits the values under different
   * namespaces (the events for P2P mode have 'p2p.' prefix). Every switch between
   * P2P mode resets the data collected so far and averages are calculated from
   * scratch.
   */
  export default class AvgRTPStatsReporter {
      /**
       * Creates new instance of <tt>AvgRTPStatsReporter</tt>
       * @param {JitsiConference} conference
       * @param {number} n the number of samples, before arithmetic mean is to be
       * calculated and values submitted to the analytics module.
       */
      constructor(conference: any, n: number);
      /**
       * How many {@link ConnectionQualityEvents.LOCAL_STATS_UPDATED} samples
       * are to be included in arithmetic mean calculation.
       * @type {number}
       * @private
       */
      private _n;
      /**
       * The current sample index. Starts from 0 and goes up to {@link _n})
       * when analytics report will be submitted.
       * @type {number}
       * @private
       */
      private _sampleIdx;
      /**
       * The conference for which stats will be collected and reported.
       * @type {JitsiConference}
       * @private
       */
      private _conference;
      /**
       * Average audio upload bitrate
       * XXX What are the units?
       * @type {AverageStatReport}
       * @private
       */
      private _avgAudioBitrateUp;
      /**
       * Average audio download bitrate
       * XXX What are the units?
       * @type {AverageStatReport}
       * @private
       */
      private _avgAudioBitrateDown;
      /**
       * Average video upload bitrate
       * XXX What are the units?
       * @type {AverageStatReport}
       * @private
       */
      private _avgVideoBitrateUp;
      /**
       * Average video download bitrate
       * XXX What are the units?
       * @type {AverageStatReport}
       * @private
       */
      private _avgVideoBitrateDown;
      /**
       * Average upload bandwidth
       * XXX What are the units?
       * @type {AverageStatReport}
       * @private
       */
      private _avgBandwidthUp;
      /**
       * Average download bandwidth
       * XXX What are the units?
       * @type {AverageStatReport}
       * @private
       */
      private _avgBandwidthDown;
      /**
       * Average total packet loss
       * XXX What are the units?
       * @type {AverageStatReport}
       * @private
       */
      private _avgPacketLossTotal;
      /**
       * Average upload packet loss
       * XXX What are the units?
       * @type {AverageStatReport}
       * @private
       */
      private _avgPacketLossUp;
      /**
       * Average download packet loss
       * XXX What are the units?
       * @type {AverageStatReport}
       * @private
       */
      private _avgPacketLossDown;
      /**
       * Average FPS for remote videos
       * @type {AverageStatReport}
       * @private
       */
      private _avgRemoteFPS;
      /**
       * Average FPS for remote screen streaming videos (reported only if not
       * a <tt>NaN</tt>).
       * @type {AverageStatReport}
       * @private
       */
      private _avgRemoteScreenFPS;
      /**
       * Average FPS for local video (camera)
       * @type {AverageStatReport}
       * @private
       */
      private _avgLocalFPS;
      /**
       * Average FPS for local screen streaming video (reported only if not
       * a <tt>NaN</tt>).
       * @type {AverageStatReport}
       * @private
       */
      private _avgLocalScreenFPS;
      /**
       * Average pixels for remote screen streaming videos (reported only if
       * not a <tt>NaN</tt>).
       * @type {AverageStatReport}
       * @private
       */
      private _avgRemoteCameraPixels;
      /**
       * Average pixels for remote screen streaming videos (reported only if
       * not a <tt>NaN</tt>).
       * @type {AverageStatReport}
       * @private
       */
      private _avgRemoteScreenPixels;
      /**
       * Average pixels for local video (camera)
       * @type {AverageStatReport}
       * @private
       */
      private _avgLocalCameraPixels;
      /**
       * Average pixels for local screen streaming video (reported only if not
       * a <tt>NaN</tt>).
       * @type {AverageStatReport}
       * @private
       */
      private _avgLocalScreenPixels;
      /**
       * Average connection quality as defined by
       * the {@link ConnectionQuality} module.
       * @type {AverageStatReport}
       * @private
       */
      private _avgCQ;
      _cachedTransportStats: {
          p2p: any;
          local_candidate_type: any;
          remote_candidate_type: any;
          transport_type: any;
      };
      _onLocalStatsUpdated: (data: any) => void;
      _onP2PStatusChanged: () => void;
      _onJvb121StatusChanged: (oldStatus: any, newStatus: any) => void;
      jvbStatsMonitor: ConnectionAvgStats;
      p2pStatsMonitor: ConnectionAvgStats;
      /**
       * Processes next batch of stats reported on
       * {@link ConnectionQualityEvents.LOCAL_STATS_UPDATED}.
       * @param {go figure} data
       * @private
       */
      private _calculateAvgStats;
      /**
       * Calculates average number of pixels for the report
       *
       * @param {map} peerResolutions a map of peer resolutions
       * @param {boolean} isLocal if the average is to be calculated for the local
       * video or <tt>false</tt> if for remote videos.
       * @param {VideoType} videoType
       * @return {number|NaN} average number of pixels or <tt>NaN</tt> if there
       * are no samples.
       * @private
       */
      private _calculateAvgVideoPixels;
      /**
       * Calculate average pixels for either remote or local participant
       * @param {object} videos maps resolution per video SSRC
       * @param {JitsiParticipant|null} participant remote participant or
       * <tt>null</tt> for local video pixels calculation.
       * @param {VideoType} videoType the type of the video for which an average
       * will be calculated.
       * @return {number|NaN} average video pixels of all participant's videos or
       * <tt>NaN</tt> if currently not available
       * @private
       */
      private _calculatePeerAvgVideoPixels;
      /**
       * Calculates average FPS for the report
       * @param {go figure} frameRate
       * @param {boolean} isLocal if the average is to be calculated for the local
       * video or <tt>false</tt> if for remote videos.
       * @param {VideoType} videoType
       * @return {number|NaN} average FPS or <tt>NaN</tt> if there are no samples.
       * @private
       */
      private _calculateAvgVideoFps;
      /**
       * Calculate average FPS for either remote or local participant
       * @param {object} videos maps FPS per video SSRC
       * @param {JitsiParticipant|null} participant remote participant or
       * <tt>null</tt> for local FPS calculation.
       * @param {VideoType} videoType the type of the video for which an average
       * will be calculated.
       * @return {number|NaN} average FPS of all participant's videos or
       * <tt>NaN</tt> if currently not available
       * @private
       */
      private _calculatePeerAvgVideoFps;
      /**
       * Sends the 'transport.stats' analytics event whenever we detect that
       * there is a change in the local or remote candidate type on the transport
       * that is currently selected.
       * @param {*} data
       * @private
       */
      private _maybeSendTransportAnalyticsEvent;
      /**
       * Resets the stats related to JVB connection. Must not be called when in
       * P2P mode, because then the {@link AverageStatReport} instances are
       * tracking P2P stats. Note that this should never happen unless something
       * is wrong with the P2P and JVB121 events.
       * @private
       */
      private _resetAvgJvbStats;
      /**
       * Reset cache of all averages and {@link _sampleIdx}.
       * @private
       */
      private _resetAvgStats;
      /**
       * Unregisters all event listeners and stops working.
       */
      dispose(): void;
  }
  /**
   * Class gathers the stats that are calculated and reported for a
   * {@link TraceablePeerConnection} even if it's not currently active. For
   * example we want to monitor RTT for the JVB connection while in P2P mode.
   */
  class ConnectionAvgStats {
      /**
       * Creates new <tt>ConnectionAvgStats</tt>
       * @param {AvgRTPStatsReporter} avgRtpStatsReporter
       * @param {boolean} isP2P
       * @param {number} n the number of samples, before arithmetic mean is to be
       * calculated and values submitted to the analytics module.
       */
      constructor(avgRtpStatsReporter: AvgRTPStatsReporter, isP2P: boolean, n: number);
      /**
       * Is this instance for JVB or P2P connection ?
       * @type {boolean}
       */
      isP2P: boolean;
      /**
       * How many samples are to be included in arithmetic mean calculation.
       * @type {number}
       * @private
       */
      private _n;
      /**
       * The current sample index. Starts from 0 and goes up to {@link _n})
       * when analytics report will be submitted.
       * @type {number}
       * @private
       */
      private _sampleIdx;
      /**
       * Average round trip time reported by the ICE candidate pair.
       * @type {AverageStatReport}
       */
      _avgRTT: AverageStatReport;
      /**
       * Map stores average RTT to the JVB reported by remote participants.
       * Mapped per participant id {@link JitsiParticipant.getId}.
       *
       * This is used only when {@link ConnectionAvgStats.isP2P} equals to
       * <tt>false</tt>.
       *
       * @type {Map<string,AverageStatReport>}
       * @private
       */
      private _avgRemoteRTTMap;
      /**
       * The conference for which stats will be collected and reported.
       * @type {JitsiConference}
       * @private
       */
      private _avgRtpStatsReporter;
      /**
       * The latest average E2E RTT for the JVB connection only.
       *
       * This is used only when {@link ConnectionAvgStats.isP2P} equals to
       * <tt>false</tt>.
       *
       * @type {number}
       */
      _avgEnd2EndRTT: number;
      _onConnectionStats: (tpc: any, stats: any) => void;
      _onUserLeft: (id: any) => boolean;
      _onRemoteStatsUpdated: (id: any, data: any) => void;
      /**
       * Processes next batch of stats.
       * @param {go figure} data
       * @private
       */
      private _calculateAvgStats;
      /**
       * Calculates arithmetic mean of all RTTs towards the JVB reported by
       * participants.
       * @return {number|NaN} NaN if not available (not enough data)
       * @private
       */
      private _calculateAvgRemoteRTT;
      /**
       * Processes {@link ConnectionQualityEvents.REMOTE_STATS_UPDATED} to analyse
       * RTT towards the JVB reported by each participant.
       * @param {string} id {@link JitsiParticipant.getId}
       * @param {go figure in ConnectionQuality.js} data
       * @private
       */
      private _processRemoteStats;
      /**
       * Reset cache of all averages and {@link _sampleIdx}.
       * @private
       */
      private _resetAvgStats;
      /**
       *
       */
      dispose(): void;
  }
  /**
   * This will calculate an average for one, named stat and submit it to
   * the analytics module when requested. It automatically counts the samples.
   */
  class AverageStatReport {
      /**
       * Creates new <tt>AverageStatReport</tt> for given name.
       * @param {string} name that's the name of the event that will be reported
       * to the analytics module.
       */
      constructor(name: string);
      name: string;
      count: number;
      sum: number;
      samples: any[];
      /**
       * Adds the next value that will be included in the average when
       * {@link calculate} is called.
       * @param {number} nextValue
       */
      addNext(nextValue: number): void;
      /**
       * Calculates an average for the samples collected using {@link addNext}.
       * @return {number|NaN} an average of all collected samples or <tt>NaN</tt>
       * if no samples were collected.
       */
      calculate(): number | number;
      /**
       * Appends the report to the analytics "data" object. The object will be
       * set under <tt>prefix</tt> + {@link this.name} key.
       * @param {Object} report the analytics "data" object
       */
      appendReport(report: any): void;
      /**
       * Clears all memory of any samples collected, so that new average can be
       * calculated using this instance.
       */
      reset(): void;
  }
  export {};

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/CallStats' {
  /**
   * An instance of this class is a wrapper for the CallStats API fabric. A fabric
   * reports one peer connection to the CallStats backend and is allocated with
   * {@link callstats.addNewFabric}. It has a bunch of instance methods for
   * reporting various events. A fabric is considered disposed when
   * {@link CallStats.sendTerminateEvent} is executed.
   *
   * Currently only one backend instance can be created ever and it's done using
   * {@link CallStats.initBackend}. At the time of this writing there is no way to
   * explicitly shutdown the backend, but it's supposed to close it's connection
   * automatically, after all fabrics have been terminated.
   */
  class CallStats {
      /**
       * A callback passed to {@link callstats.addNewFabric}.
       * @param {string} error 'success' means ok
       * @param {string} msg some more details
       * @private
       */
      private static _addNewFabricCallback;
      /**
       * Callback passed to {@link callstats.initialize} (backend initialization)
       * @param {string} error 'success' means ok
       * @param {String} msg
       * @private
       */
      private static _initCallback;
      /**
       * Empties report queue.
       *
       * @param {CallStats} csInstance - The callstats instance.
       * @private
       */
      private static _emptyReportQueue;
      /**
       * Reports an error to callstats.
       *
       * @param {CallStats} [cs]
       * @param type the type of the error, which will be one of the wrtcFuncNames
       * @param error the error
       * @param pc the peerconnection
       * @private
       */
      private static _reportError;
      /**
       * Reports an error to callstats.
       *
       * @param {CallStats} cs
       * @param event the type of the event, which will be one of the fabricEvent
       * @param eventData additional data to pass to event
       * @private
       */
      private static _reportEvent;
      /**
       * Wraps some of the CallStats API method and logs their calls with
       * arguments on the debug logging level. Also wraps some of the backend
       * methods execution into try catch blocks to not crash the app in case
       * there is a problem with the backend itself.
       * @param {callstats} theBackend
       * @private
       */
      private static _traceAndCatchBackendCalls;
      /**
       * Returns the Set with the currently existing {@link CallStats} instances.
       * Lazily initializes the Set to allow any Set polyfills to be applied.
       * @type {Set<CallStats>}
       */
      static get fabrics(): Set<CallStats>;
      /**
       * Initializes the CallStats backend. Should be called only if
       * {@link CallStats.isBackendInitialized} returns <tt>false</tt>.
       * @param {object} options
       * @param {String} options.callStatsID CallStats credentials - ID
       * @param {String} options.callStatsSecret CallStats credentials - secret
       * @param {string} options.aliasName the <tt>aliasName</tt> part of
       * the <tt>userID</tt> aka endpoint ID, see CallStats docs for more info.
       * @param {string} options.userName the <tt>userName</tt> part of
       * the <tt>userID</tt> aka display name, see CallStats docs for more info.
       *
       */
      static initBackend(options: {
          callStatsID: string;
          callStatsSecret: string;
          aliasName: string;
          userName: string;
      }): boolean;
      /**
       * Checks if the CallStats backend has been created. It does not mean that
       * it has been initialized, but only that the API instance has been
       * allocated successfully.
       * @return {boolean} <tt>true</tt> if backend exists or <tt>false</tt>
       * otherwise
       */
      static isBackendInitialized(): boolean;
      /**
       * Notifies CallStats about active device.
       * @param {{deviceList: {String:String}}} devicesData list of devices with
       * their data
       * @param {CallStats} cs callstats instance related to the event
       */
      static sendActiveDeviceListEvent(devicesData: {
          deviceList: {
              String: string;
          };
      }, cs: CallStats): void;
      /**
       * Notifies CallStats that there is a log we want to report.
       *
       * @param {Error} e error to send or {String} message
       * @param {CallStats} cs callstats instance related to the error (optional)
       */
      static sendApplicationLog(e: Error, cs: CallStats): void;
      /**
       * Sends the given feedback through CallStats.
       *
       * @param {string} conferenceID the conference ID for which the feedback
       * will be reported.
       * @param overall an integer between 1 and 5 indicating the
       * user feedback
       * @param comment detailed feedback from the user.
       */
      static sendFeedback(conferenceID: string, overall: any, comment: any): Promise<any>;
      /**
       * Notifies CallStats that getUserMedia failed.
       *
       * @param {Error} e error to send
       * @param {CallStats} cs callstats instance related to the error (optional)
       */
      static sendGetUserMediaFailed(e: Error, cs: CallStats): void;
      /**
       * Notifies CallStats for mute events
       * @param mute {boolean} true for muted and false for not muted
       * @param type {String} "audio"/"video"
       * @param {CallStats} cs callstats instance related to the event
       */
      static sendMuteEvent(mute: boolean, type: string, cs: CallStats): void;
      /**
       * Creates new CallStats instance that handles all callstats API calls for
       * given {@link TraceablePeerConnection}. Each instance is meant to handle
       * one CallStats fabric added with 'addFabric' API method for the
       * {@link TraceablePeerConnection} instance passed in the constructor.
       * @param {TraceablePeerConnection} tpc
       * @param {Object} options
       * @param {string} options.confID the conference ID that wil be used to
       * report the session.
       * @param {string} [options.remoteUserID='jitsi'] the remote user ID to
       * which given <tt>tpc</tt> is connected.
       */
      constructor(tpc: any, options: {
          confID: string;
          remoteUserID?: string;
      });
      confID: string;
      tpc: any;
      peerconnection: any;
      remoteUserID: string;
      hasFabric: boolean;
      /**
       * Initializes CallStats fabric by calling "addNewFabric" for
       * the peer connection associated with this instance.
       * @return {boolean} true if the call was successful or false otherwise.
       */
      _addNewFabric(): boolean;
      /**
       * Lets CallStats module know where is given SSRC rendered by providing
       * renderer tag ID.
       * If the lib is not initialized yet queue the call for later, when it's
       * ready.
       * @param {number} ssrc the SSRC of the stream
       * @param {boolean} isLocal indicates whether this the stream is local
       * @param {string|null} streamEndpointId if the stream is not local the it
       * needs to contain the stream owner's ID
       * @param {string} usageLabel meaningful usage label of this stream like
       *        'microphone', 'camera' or 'screen'.
       * @param {string} containerId  the id of media 'audio' or 'video' tag which
       *        renders the stream.
       */
      associateStreamWithVideoTag(ssrc: number, isLocal: boolean, streamEndpointId: string | null, usageLabel: string, containerId: string): void;
      /**
       * Notifies CallStats that we are the new dominant speaker in the
       * conference.
       */
      sendDominantSpeakerEvent(): void;
      /**
       * Notifies CallStats that the fabric for the underlying peerconnection was
       * closed and no evens should be reported, after this call.
       */
      sendTerminateEvent(): void;
      /**
       * Notifies CallStats for ice connection failed
       */
      sendIceConnectionFailedEvent(): void;
      /**
       * Notifies CallStats that peer connection failed to create offer.
       *
       * @param {Error} e error to send
       */
      sendCreateOfferFailed(e: Error): void;
      /**
       * Notifies CallStats that peer connection failed to create answer.
       *
       * @param {Error} e error to send
       */
      sendCreateAnswerFailed(e: Error): void;
      /**
       * Sends either resume or hold event for the fabric associated with
       * the underlying peerconnection.
       * @param {boolean} isResume true to resume or false to hold
       */
      sendResumeOrHoldEvent(isResume: boolean): void;
      /**
       * Notifies CallStats for screen sharing events
       * @param {boolean} start true for starting screen sharing and
       * false for not stopping
       * @param {string|null} ssrc - optional ssrc value, used only when
       * starting screen sharing.
       */
      sendScreenSharingEvent(start: boolean, ssrc: string | null): void;
      /**
       * Notifies CallStats that peer connection failed to set local description.
       *
       * @param {Error} e error to send
       */
      sendSetLocalDescFailed(e: Error): void;
      /**
       * Notifies CallStats that peer connection failed to set remote description.
       *
       * @param {Error} e error to send
       */
      sendSetRemoteDescFailed(e: Error): void;
      /**
       * Notifies CallStats that peer connection failed to add ICE candidate.
       *
       * @param {Error} e error to send
       */
      sendAddIceCandidateFailed(e: Error): void;
  }
  namespace CallStats {
      const backend: any;
      const reportsQueue: any[];
      const backendInitialized: boolean;
      const callStatsID: string;
      const callStatsSecret: string;
      const userID: object;
  }
  export default CallStats;

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/LocalStatsCollector' {
  /**
   * <tt>LocalStatsCollector</tt> calculates statistics for the local stream.
   *
   * @param stream the local stream
   * @param interval stats refresh interval given in ms.
   * @param callback function that receives the audio levels.
   * @constructor
   */
  function LocalStatsCollector(stream: any, interval: any, callback: any): void;
  class LocalStatsCollector {
      /**
       * <tt>LocalStatsCollector</tt> calculates statistics for the local stream.
       *
       * @param stream the local stream
       * @param interval stats refresh interval given in ms.
       * @param callback function that receives the audio levels.
       * @constructor
       */
      constructor(stream: any, interval: any, callback: any);
      stream: any;
      intervalId: NodeJS.Timeout;
      intervalMilis: any;
      audioLevel: number;
      callback: any;
      start(): void;
      stop(): void;
  }
  namespace LocalStatsCollector {
      function isLocalStatsSupported(): boolean;
  }
  export default LocalStatsCollector;

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/PerformanceObserverStats' {
  /**
   * This class creates an observer that monitors browser's performance measurement events
   * as they are recorded in the browser's performance timeline and computes an average and
   * a maximum value for the long task events. Tasks are classified as long tasks if they take
   * longer than 50ms to execute on the main thread.
   */
  export class PerformanceObserverStats {
      /**
       * Creates a new instance of Performance observer statistics.
       *
       * @param {*} emitter Event emitter for emitting stats periodically
       * @param {*} statsInterval interval for calculating the stats
       */
      constructor(emitter: any, statsInterval: any);
      eventEmitter: any;
      longTasks: number;
      maxDuration: number;
      performanceStatsInterval: any;
      stats: RunningAverage;
      /**
       * Obtains the average rate of long tasks observed per min and the
       * duration of the longest task recorded by the observer.
       * @returns {Object}
       */
      getLongTasksStats(): any;
      /**
       * Starts the performance observer by registering the callback function
       * that calculates the performance statistics periodically.
       * @returns {void}
       */
      startObserver(): void;
      longTaskEventHandler: (list: any) => void;
      observer: PerformanceObserver;
      longTasksIntervalId: NodeJS.Timeout;
      _lastTimeStamp: number;
      /**
       * Stops the performance observer.
       * @returns {void}
       */
      stopObserver(): void;
  }
  import { RunningAverage } from "@lyno/lib-jitsi-meet/modules/util/MathUtil";

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/PrecallTest' {
  /**
   * Loads the callstats script and initializes the library.
   *
   * @param {Function} onResult - The callback to be invoked when results are received.
   * @returns {Promise<void>}
   */
  export function init(options: any): Promise<void>;
  /**
   * Executes a pre call test.
   *
   * @typedef PrecallTestResults
   * @type {Object}
   * @property {boolean} mediaConnectivity - If there is media connectivity or not.
   * @property {number} throughput  - The average throughput.
   * @property {number} fractionalLoss - The packet loss.
   * @property {number} rtt - The round trip time.
   * @property {string} provider - It is usually 'callstats'.
   *
   * @returns {Promise<{PrecallTestResults}>}
   */
  export function execute(): Promise<{
      PrecallTestResults;
  }>;
  namespace _default {
      export { init };
      export { execute };
  }
  export default _default;
  /**
   * Initializes the callstats lib and registers a callback to be invoked
   * when there are 'preCallTestResults'.
   */
  export type PrecallTestOptions = {
      /**
       * - Callstats credentials - the id.
       */
      callStatsID: string;
      /**
       * - Callstats credentials - the secret.
       */
      callStatsSecret: string;
      /**
       * - The user name to use when initializing callstats.
       */
      statisticsId: string;
      /**
       * - The user display name.
       */
      statisticsDisplayName: string;
  };
  /**
   * Executes a pre call test.
   */
  export type PrecallTestResults = {
      /**
       * - If there is media connectivity or not.
       */
      mediaConnectivity: boolean;
      /**
       * - The average throughput.
       */
      throughput: number;
      /**
       * - The packet loss.
       */
      fractionalLoss: number;
      /**
       * - The round trip time.
       */
      rtt: number;
      /**
       * - It is usually 'callstats'.
       */
      provider: string;
  };

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/RTPStatsCollector' {
  /**
   * <tt>StatsCollector</tt> registers for stats updates of given
   * <tt>peerconnection</tt> in given <tt>interval</tt>. On each update particular
   * stats are extracted and put in {@link SsrcStats} objects. Once the processing
   * is done <tt>audioLevelsUpdateCallback</tt> is called with <tt>this</tt>
   * instance as an event source.
   *
   * @param peerconnection WebRTC PeerConnection object.
   * @param audioLevelsInterval
   * @param statsInterval stats refresh interval given in ms.
   * @param eventEmitter
   * @constructor
   */
  export default function StatsCollector(peerconnection: any, audioLevelsInterval: any, statsInterval: any, eventEmitter: any): void;
  export default class StatsCollector {
      /**
       * <tt>StatsCollector</tt> registers for stats updates of given
       * <tt>peerconnection</tt> in given <tt>interval</tt>. On each update particular
       * stats are extracted and put in {@link SsrcStats} objects. Once the processing
       * is done <tt>audioLevelsUpdateCallback</tt> is called with <tt>this</tt>
       * instance as an event source.
       *
       * @param peerconnection WebRTC PeerConnection object.
       * @param audioLevelsInterval
       * @param statsInterval stats refresh interval given in ms.
       * @param eventEmitter
       * @constructor
       */
      constructor(peerconnection: any, audioLevelsInterval: any, statsInterval: any, eventEmitter: any);
      /**
       * The browser type supported by this StatsCollector. In other words, the
       * type of the browser which initialized this StatsCollector
       * instance.
       * @private
       */
      private _browserType;
      /**
       * Whether to use the Promise-based getStats API or not.
       * @type {boolean}
       */
      _usesPromiseGetStats: boolean;
      /**
       * The function which is to be used to retrieve the value associated in a
       * report returned by RTCPeerConnection#getStats with a lib-jitsi-meet
       * browser-agnostic name/key.
       *
       * @function
       * @private
       */
      private _getStatValue;
      peerconnection: any;
      baselineAudioLevelsReport: any;
      currentAudioLevelsReport: any;
      currentStatsReport: any;
      previousStatsReport: any;
      audioLevelReportHistory: {};
      audioLevelsIntervalId: NodeJS.Timeout;
      eventEmitter: any;
      conferenceStats: ConferenceStats;
      audioLevelsIntervalMilis: any;
      statsIntervalId: NodeJS.Timeout;
      statsIntervalMilis: any;
      /**
       * Maps SSRC numbers to {@link SsrcStats}.
       * @type {Map<number,SsrcStats}
       */
      ssrc2stats: Map<number, SsrcStats>;
      stop(): void;
      errorCallback(error: any): void;
      start(startAudioLevelStats: any): void;
      _defineGetStatValueMethod(keys: {
          [x: string]: string;
      }): (item: any, name: any) => any;
      private getNonNegativeStat;
      processStatsReport(): void;
      _processAndEmitReport(): void;
      processAudioLevelReport(): void;
      _defineNewGetStatValueMethod(keys: {
          [x: string]: string;
      }): (item: any, name: any) => any;
      private getNonNegativeValue;
      private _calculateBitrate;
      processNewStatsReport(): void;
      processNewAudioLevelReport(): void;
  }
  /**
   *
   */
  function ConferenceStats(): void;
  class ConferenceStats {
      /**
       * The bandwidth
       * @type {{}}
       */
      bandwidth: {};
      /**
       * The bit rate
       * @type {{}}
       */
      bitrate: {};
      /**
       * The packet loss rate
       * @type {{}}
       */
      packetLoss: {};
      /**
       * Array with the transport information.
       * @type {Array}
       */
      transport: any[];
  }
  /**
   * Holds "statistics" for a single SSRC.
   * @constructor
   */
  function SsrcStats(): void;
  class SsrcStats {
      loss: {};
      bitrate: {
          download: number;
          upload: number;
      };
      resolution: {};
      framerate: number;
      codec: string;
      setLoss(loss: any): void;
      setResolution(resolution: any): void;
      addBitrate(bitrate: any): void;
      resetBitrate(): void;
      setFramerate(framerate: any): void;
      setCodec(codec: any): void;
  }
  export {};

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/SpeakerStats' {
  export = SpeakerStats;
  /**
   * A model for keeping track of each user's total
   * time as a dominant speaker. The model also
   * keeps track of the user's last known name
   * in case the user has left the meeting,
   * which is also tracked.
   */
  class SpeakerStats {
      /**
       * Initializes a new SpeakerStats instance.
       *
       * @constructor
       * @param {string} userId - The id of the user being tracked.
       * @param {string} displayName - The name of the user being tracked.
       * @param {boolean} isLocalStats - True if the stats model tracks
       * the local user.
       * @returns {void}
       */
      constructor(userId: string, displayName: string, isLocalStats: boolean);
      _userId: string;
      _isLocalStats: boolean;
      totalDominantSpeakerTime: number;
      _dominantSpeakerStart: number;
      _hasLeft: boolean;
      /**
       * Get the user id being tracked.
       *
       * @returns {string} The user id.
       */
      getUserId(): string;
      /**
       * Get the name of the user being tracked.
       *
       * @returns {string} The user name.
       */
      getDisplayName(): string;
      /**
       * Updates the last known name of the user being tracked.
       *
       * @param {string} - The user name.
       * @returns {void}
       */
      setDisplayName(newName: any): void;
      displayName: any;
      /**
       * Returns true if the stats are tracking the local user.
       *
       * @returns {boolean}
       */
      isLocalStats(): boolean;
      /**
       * Returns true if the tracked user is currently a dominant speaker.
       *
       * @returns {boolean}
       */
      isDominantSpeaker(): boolean;
      /**
       * Returns true if the tracked user is currently a dominant speaker.
       *
       * @param {boolean} - If true, the user will being accumulating time
       * as dominant speaker. If false, the user will not accumulate time
       * and will record any time accumulated since starting as dominant speaker.
       * @returns {void}
       */
      setDominantSpeaker(isNowDominantSpeaker: any): void;
      /**
       * Get how long the tracked user has been dominant speaker.
       *
       * @returns {number} - The speaker time in milliseconds.
       */
      getTotalDominantSpeakerTime(): number;
      /**
       * Get whether or not the user is still in the meeting.
       *
       * @returns {boolean} True if the user is no longer in the meeting.
       */
      hasLeft(): boolean;
      /**
       * Set the user as having left the meeting.
       *
       * @returns {void}
       */
      markAsHasLeft(): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/SpeakerStatsCollector' {
  /**
   * A collection for tracking speaker stats. Attaches listeners
   * to the conference to automatically update on tracked events.
   */
  export default class SpeakerStatsCollector {
      /**
       * Initializes a new SpeakerStatsCollector instance.
       *
       * @constructor
       * @param {JitsiConference} conference - The conference to track.
       * @returns {void}
       */
      constructor(conference: any);
      stats: {
          users: {};
          dominantSpeakerId: any;
      };
      conference: any;
      /**
       * Reacts to dominant speaker change events by changing its speaker stats
       * models to reflect the current dominant speaker.
       *
       * @param {string} dominantSpeakerId - The user id of the new
       * dominant speaker.
       * @returns {void}
       * @private
       */
      private _onDominantSpeaker;
      /**
       * Reacts to user join events by creating a new SpeakerStats model.
       *
       * @param {string} userId - The user id of the new user.
       * @param {JitsiParticipant} - The JitsiParticipant model for the new user.
       * @returns {void}
       * @private
       */
      private _onUserJoin;
      /**
       * Reacts to user leave events by updating the associated user's
       * SpeakerStats model.
       *
       * @param {string} userId - The user id of the user that left.
       * @returns {void}
       * @private
       */
      private _onUserLeave;
      /**
       * Reacts to user name change events by updating the last known name
       * tracked in the associated SpeakerStats model.
       *
       * @param {string} userId - The user id of the user that left.
       * @returns {void}
       * @private
       */
      private _onDisplayNameChange;
      /**
       * Return a copy of the tracked SpeakerStats models.
       *
       * @returns {Object} The keys are the user ids and the values are the
       * associated user's SpeakerStats model.
       * @private
       */
      private getStats;
      /**
       * Updates of the current stats is requested, passing the new values.
       *
       * @param {Object} newStats - The new values used to update current one.
       * @private
       */
      private _updateStats;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/constants' {
  export const CALLSTATS_SCRIPT_URL: "https://api.callstats.io/static/callstats-ws.min.js";

}
declare module '@lyno/lib-jitsi-meet/modules/statistics/statistics' {
  /**
   * The options to configure Statistics.
   * @typedef {Object} StatisticsOptions
   * @property {string} applicationName - The application name to pass to
   * callstats.
   * @property {string} aliasName - The alias name to use when initializing callstats.
   * @property {string} userName - The user name to use when initializing callstats.
   * @property {string} confID - The callstats conference ID to use.
   * @property {string} callStatsID - Callstats credentials - the id.
   * @property {string} callStatsSecret - Callstats credentials - the secret.
   * @property {string} customScriptUrl - A custom lib url to use when downloading
   * callstats library.
   * @property {string} roomName - The room name we are currently in.
   */
  /**
   *
   * @param xmpp
   * @param {StatisticsOptions} options - The options to use creating the
   * Statistics.
   */
  function Statistics(xmpp: any, options: StatisticsOptions): void;
  class Statistics {
      /**
       * The options to configure Statistics.
       * @typedef {Object} StatisticsOptions
       * @property {string} applicationName - The application name to pass to
       * callstats.
       * @property {string} aliasName - The alias name to use when initializing callstats.
       * @property {string} userName - The user name to use when initializing callstats.
       * @property {string} confID - The callstats conference ID to use.
       * @property {string} callStatsID - Callstats credentials - the id.
       * @property {string} callStatsSecret - Callstats credentials - the secret.
       * @property {string} customScriptUrl - A custom lib url to use when downloading
       * callstats library.
       * @property {string} roomName - The room name we are currently in.
       */
      /**
       *
       * @param xmpp
       * @param {StatisticsOptions} options - The options to use creating the
       * Statistics.
       */
      constructor(xmpp: any, options: StatisticsOptions);
      /**
       * {@link RTPStats} mapped by {@link TraceablePeerConnection.id} which
       * collect RTP statistics for each peerconnection.
       * @type {Map<string, RTPStats}
       */
      rtpStatsMap: Map<string, RTPStats>;
      eventEmitter: any;
      xmpp: any;
      options: {};
      callStatsIntegrationEnabled: boolean;
      callStatsApplicationLogsDisabled: any;
      /**
       * Stores {@link CallStats} instances for each
       * {@link TraceablePeerConnection} (one {@link CallStats} instance serves
       * one TPC). The instances are mapped by {@link TraceablePeerConnection.id}.
       * @type {Map<number, CallStats>}
       */
      callsStatsInstances: Map<number, CallStats>;
      startRemoteStats(peerconnection: any): void;
      addAudioLevelListener(listener: any): void;
      removeAudioLevelListener(listener: any): void;
      addBeforeDisposedListener(listener: any): void;
      removeBeforeDisposedListener(listener: any): void;
      addConnectionStatsListener(listener: any): void;
      removeConnectionStatsListener(listener: any): void;
      addByteSentStatsListener(listener: any): void;
      removeByteSentStatsListener(listener: any): void;
      addLongTasksStatsListener(listener: Function): void;
      attachLongTasksStats(conference: any): void;
      performanceObserverStats: PerformanceObserverStats;
      getLongTasksStats(): any | null;
      removeLongTasksStatsListener(listener: Function): void;
      dispose(): void;
      private _stopRemoteStats;
      stopRemoteStats(tpc: any): void;
      startCallStats(tpc: any, remoteUserID: string): void;
      stopCallStats(tpc: any): void;
      isCallstatsEnabled(): boolean;
      sendConnectionResumeOrHoldEvent(tpc: any, isResume: boolean): void;
      sendIceConnectionFailedEvent(tpc: any): void;
      sendMuteEvent(tpc: any, muted: boolean, type: string): void;
      sendScreenSharingEvent(start: boolean, ssrc: string | null): void;
      sendDominantSpeakerEvent(roomJid: string): void;
      associateStreamWithVideoTag(tpc: any, ssrc: number, isLocal: boolean, userId: string, usageLabel: string, containerId: string): void;
      sendCreateOfferFailed(e: Error, tpc: any): void;
      sendCreateAnswerFailed(e: Error, tpc: any): void;
      sendSetLocalDescFailed(e: Error, tpc: any): void;
      sendSetRemoteDescFailed(e: Error, tpc: any): void;
      sendAddIceCandidateFailed(e: Error, tpc: any): void;
      sendFeedback(overall: any, comment: any): Promise<any>;
  }
  namespace Statistics {
      export function init(options: any): void;
      export const audioLevelsEnabled: boolean;
      export const audioLevelsInterval: number;
      export const pcStatsInterval: number;
      export const disableThirdPartyRequests: boolean;
      export { analytics };
      export const instances: any;
      export const localStats: any[];
      export function startLocalStats(stream: any, callback: any): void;
      export function stopLocalStats(stream: any): void;
      export function _getAllCallStatsInstances(): Set<CallStats>;
      export function sendActiveDeviceListEvent(devicesData: {
          deviceList: {
              String: string;
          };
      }): void;
      export function sendGetUserMediaFailed(e: Error): void;
      export function sendLog(m: string): void;
      export const LOCAL_JID: string;
      export function reportGlobalError(error: Error): void;
      export function sendAnalyticsAndLog(event: any, properties?: any): void;
      export function sendAnalytics(eventName: any, properties?: any): void;
  }
  export default Statistics;
  /**
   * The options to configure Statistics.
   */
  export type StatisticsOptions = {
      /**
       * - The application name to pass to
       * callstats.
       */
      applicationName: string;
      /**
       * - The alias name to use when initializing callstats.
       */
      aliasName: string;
      /**
       * - The user name to use when initializing callstats.
       */
      userName: string;
      /**
       * - The callstats conference ID to use.
       */
      confID: string;
      /**
       * - Callstats credentials - the id.
       */
      callStatsID: string;
      /**
       * - Callstats credentials - the secret.
       */
      callStatsSecret: string;
      /**
       * - A custom lib url to use when downloading
       * callstats library.
       */
      customScriptUrl: string;
      /**
       * - The room name we are currently in.
       */
      roomName: string;
  };
  import RTPStats from "@lyno/lib-jitsi-meet/modules/statistics/RTPStatsCollector";
  import CallStats from "@lyno/lib-jitsi-meet/modules/statistics/CallStats";
  import { PerformanceObserverStats } from "@lyno/lib-jitsi-meet/modules/statistics/PerformanceObserverStats";
  import analytics from "@lyno/lib-jitsi-meet/modules/statistics/AnalyticsAdapter";

}
declare module '@lyno/lib-jitsi-meet/modules/transcription/audioRecorder' {
  /**
   * main exported object of the file, holding all
   * relevant functions and variables for the outside world
   * @param jitsiConference the jitsiConference which this object
   * is going to record
   */
  function AudioRecorder(jitsiConference: any): void;
  namespace AudioRecorder {
      var determineCorrectFileType: () => "audio/webm" | "audio/ogg";
  }
  /**
   * export the main object AudioRecorder
   */
  export default AudioRecorder;

}
declare module '@lyno/lib-jitsi-meet/modules/transcription/recordingResult' {
  /**
   * This object stores variables needed around the recording of an audio stream
   * and passing this recording along with additional information along to
   * different processes
   * @param blob the recording audio stream as a single blob
   * @param name the name of the person of the audio stream
   * @param startTime the time in UTC when recording of the audiostream started
   * @param wordArray the recorder audio stream transcribed as an array of Word
   *                  objects
   */
  const RecordingResult: (blob: any, name: any, startTime: any, wordArray: any) => void;
  export default RecordingResult;

}
declare module '@lyno/lib-jitsi-meet/modules/transcription/transcriber' {
  /**
   * This is the main object for handing the Transcription. It interacts with
   * the audioRecorder to record every person in a conference and sends the
   * recorder audio to a transcriptionService. The returned speech-to-text result
   * will be merged to create a transcript
   * @param {AudioRecorder} audioRecorder An audioRecorder recording a conference
   */
  function Transcriber(): void;
  export default Transcriber;

}
declare module '@lyno/lib-jitsi-meet/modules/transcription/transcriberHolder' {
  export const transcribers: any[];
  export function add(transcriber: any): void;
  export function add(transcriber: any): void;

}
declare module '@lyno/lib-jitsi-meet/modules/transcription/transcriptionServices/AbstractTranscriptionService' {
  export = TranscriptionService;
  class TranscriptionService {
      send(recordingResult: any, callback: Function): void;
      sendRequest(audioBlob: Blob, callback: Function): never;
      formatResponse(response: any): Array<any>;
      verify(response: any): boolean;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/transcription/transcriptionServices/SphinxTranscriptionService' {
  export = SphinxService;
  class SphinxService {
      sendRequest(audioFileBlob: any, callback: any): void;
      formatResponse(response: any): any[];
      verify(response: any): boolean;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/transcription/word' {
  /**
   * An object representing a transcribed word, with some additional information
   * @param word the word
   * @param begin the time the word was started being uttered
   * @param end the time the word stopped being uttered
   */
  const Word: (word: any, begin: any, end: any) => void;
  export default Word;

}
declare module '@lyno/lib-jitsi-meet/modules/util/AsyncQueue' {
  /**
   * A queue for async task execution.
   */
  export default class AsyncQueue {
      _queue: any;
      _stopped: boolean;
      /**
       * Removes any pending tasks from the queue.
       */
      clear(): void;
      /**
       * Internal task processing implementation which makes things work.
       */
      _processQueueTasks(task: any, finishedCallback: any): void;
      /**
       * The 'task' function will be given a callback it MUST call with either:
       *  1) No arguments if it was successful or
       *  2) An error argument if there was an error
       * If the task wants to process the success or failure of the task, it
       * should pass the {@code callback} to the push function, e.g.:
       * queue.push(task, (err) => {
       *     if (err) {
       *         // error handling
       *     } else {
       *         // success handling
       *     }
       * });
       *
       * @param {function} task - The task to be executed. See the description above.
       * @param {function} [callback] - Optional callback to be called after the task has been executed.
       */
      push(task: Function, callback?: Function): void;
      /**
       * Shutdowns the queue. All already queued tasks will execute, but no future tasks can be added. If a task is added
       * after the queue has been shutdown then the callback will be called with an error.
       */
      shutdown(): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/util/AuthUtil' {
  /**
   * Creates the URL pointing to JWT token authentication service. It is
   * formatted from the 'urlPattern' argument which can contain the following
   * constants:
   * '{room}' - name of the conference room passed as <tt>roomName</tt>
   * argument to this method.
   * '{roleUpgrade}' - will contain 'true' if the URL will be used for
   * the role upgrade scenario, where user connects from anonymous domain and
   * then gets upgraded to the moderator by logging-in from the popup window.
   *
   * @param urlPattern a URL pattern pointing to the login service
   * @param roomName the name of the conference room for which the user will
   * be authenticated
   * @param {bool} roleUpgrade <tt>true</tt> if the URL will be used for role
   * upgrade scenario, where the user logs-in from the popup window in order
   * to have the moderator rights granted
   *
   * @returns {string|null} the URL pointing to JWT login service or
   * <tt>null</tt> if 'urlPattern' is not a string and the URL can not be
   * constructed.
   */
  export function getTokenAuthUrl(urlPattern: any, roomName: any, roleUpgrade: any): string;
  /**
   * Creates the URL pointing to JWT token authentication service. It is
   * formatted from the 'urlPattern' argument which can contain the following
   * constants:
   * '{room}' - name of the conference room passed as <tt>roomName</tt>
   * argument to this method.
   * '{roleUpgrade}' - will contain 'true' if the URL will be used for
   * the role upgrade scenario, where user connects from anonymous domain and
   * then gets upgraded to the moderator by logging-in from the popup window.
   *
   * @param urlPattern a URL pattern pointing to the login service
   * @param roomName the name of the conference room for which the user will
   * be authenticated
   * @param {bool} roleUpgrade <tt>true</tt> if the URL will be used for role
   * upgrade scenario, where the user logs-in from the popup window in order
   * to have the moderator rights granted
   *
   * @returns {string|null} the URL pointing to JWT login service or
   * <tt>null</tt> if 'urlPattern' is not a string and the URL can not be
   * constructed.
   */
  export function getTokenAuthUrl(urlPattern: any, roomName: any, roleUpgrade: any): string;

}
declare module '@lyno/lib-jitsi-meet/modules/util/Deferred' {
  /**
   * Promise-like object which can be passed around for resolving it later. It
   * implements the "thenable" interface, so it can be used wherever a Promise
   * could be used.
   *
   * In addition a "reject on timeout" functionality is provided.
   */
  export default class Deferred {
      promise: Promise<any>;
      resolve: (...args: any[]) => void;
      reject: (...args: any[]) => void;
      then: any;
      catch: any;
      /**
       * Clears the reject timeout.
       */
      clearRejectTimeout(): void;
      /**
       * Rejects the promise after the given timeout.
       */
      setRejectTimeout(ms: any): void;
      _timeout: NodeJS.Timeout;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/util/EventEmitterForwarder' {
  export = EventEmitterForwarder;
  /**
   * Implements utility to forward events from one eventEmitter to another.
   * @param src {object} instance of EventEmitter or another class that implements
   * addListener method which will register listener to EventEmitter instance.
   * @param dest {object} instance of EventEmitter or another class that
   * implements emit method which will emit an event.
   */
  function EventEmitterForwarder(src: object, dest: object): void;
  class EventEmitterForwarder {
      /**
       * Implements utility to forward events from one eventEmitter to another.
       * @param src {object} instance of EventEmitter or another class that implements
       * addListener method which will register listener to EventEmitter instance.
       * @param dest {object} instance of EventEmitter or another class that
       * implements emit method which will emit an event.
       */
      constructor(src: object, dest: object);
      src: any;
      dest: any;
      forward(...args: any[]): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/util/GlobalOnErrorHandler' {
  /**
   * Adds new error handlers.
   * @param handler the new handler.
   */
  export function addHandler(handler: any): void;
  /**
   * Adds new error handlers.
   * @param handler the new handler.
   */
  export function addHandler(handler: any): void;
  /**
   * Calls the global error handler if there is one.
   * @param error the error to pass to the error handler
   */
  export function callErrorHandler(error: any): void;
  /**
   * Calls the global error handler if there is one.
   * @param error the error to pass to the error handler
   */
  export function callErrorHandler(error: any): void;
  /**
   * Calls the global rejection handler if there is one.
   * @param error the error to pass to the rejection handler.
   */
  export function callUnhandledRejectionHandler(error: any): void;
  /**
   * Calls the global rejection handler if there is one.
   * @param error the error to pass to the rejection handler.
   */
  export function callUnhandledRejectionHandler(error: any): void;

}
declare module '@lyno/lib-jitsi-meet/modules/util/Listenable' {
  /**
   * The class implements basic event operations - add/remove listener.
   * NOTE: The purpose of the class is to be extended in order to add
   * this functionality to other classes.
   */
  export default class Listenable {
      /**
       * Creates new instance.
       * @param {EventEmitter} eventEmitter
       * @constructor
       */
      constructor(eventEmitter?: any);
      eventEmitter: any;
      addEventListener: (eventName: string, listener: Function) => Function;
      on: (eventName: string, listener: Function) => Function;
      removeEventListener: (eventName: string, listener: Function) => void;
      off: (eventName: string, listener: Function) => void;
      /**
       * Adds new listener.
       * @param {String} eventName the name of the event
       * @param {Function} listener the listener.
       * @returns {Function} - The unsubscribe function.
       */
      addListener(eventName: string, listener: Function): Function;
      /**
       * Removes listener.
       * @param {String} eventName the name of the event that triggers the
       * listener
       * @param {Function} listener the listener.
       */
      removeListener(eventName: string, listener: Function): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/util/MathUtil' {
  /**
   * The method will increase the given number by 1. If the given counter is equal
   * or greater to {@link Number.MAX_SAFE_INTEGER} then it will be rolled back to
   * 1.
   * @param {number} number - An integer counter value to be incremented.
   * @return {number} the next counter value increased by 1 (see the description
   * above for exception).
   */
  export function safeCounterIncrement(number: number): number;
  /**
   * Calculates the average value of am Array of numbers.
   *
   * @param {Float32Array} valueArray - Array of numbers.
   * @returns {number} - Number array average.
   */
  export function calculateAverage(valueArray: Float32Array): number;
  /**
   * Calculates a unique hash for a given string similar to Java's
   * implementation of String.hashCode()
   *
   * @param {String} string - String whose hash has to be calculated.
   * @returns {number} - Unique hash code calculated.
   */
  export function hashString(string: string): number;
  /**
   * Returns only the positive values from an array of numbers.
   *
   * @param {Float32Array} valueArray - Array of vad scores.
   * @returns {Array} - Array of positive numbers.
   */
  export function filterPositiveValues(valueArray: Float32Array): any[];
  /**
   * This class calculates a simple running average that continually changes
   * as more data points are collected and added.
   */
  export class RunningAverage {
      average: number;
      n: number;
      /**
       * Adds a new data point to the existing set of values and recomputes
       * the running average.
       * @param {number} value
       * @returns {void}
       */
      addNext(value: number): void;
      /**
       * Obtains the average value for the current subset of values.
       * @returns {number} - computed average.
       */
      getAverage(): number;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/util/RandomUtil' {
  /**
   * Get random element from array or string.
   * @param {Array|string} arr source
   * @returns array element or string character
   */
  export function randomElement(arr: any[] | string): any;
  /**
   * Generate random alphanumeric string.
   * @param {number} length expected string length
   * @returns {string} random string of specified length
   */
  export function randomAlphanumStr(length: number): string;
  /**
   * Generates random int within the range [min, max]
   * @param min the minimum value for the generated number
   * @param max the maximum value for the generated number
   * @returns random int number
   */
  export function randomInt(min: any, max: any): any;
  /**
   * Returns a random hex digit.
   * @returns {*}
   */
  export function randomHexDigit(): any;
  /**
   * Returns a random hex digit.
   * @returns {*}
   */
  export function randomHexDigit(): any;
  /**
   * Returns a random string of hex digits with length 'len'.
   * @param len the length.
   */
  export function randomHexString(len: any): string;
  /**
   * Returns a random string of hex digits with length 'len'.
   * @param len the length.
   */
  export function randomHexString(len: any): string;

}
declare module '@lyno/lib-jitsi-meet/modules/util/Retry' {
  /**
  * Gets next timeout using the full jitter pattern.
  *
  * NOTE that there are no checks for argument correctness, so either do the math or use defaults.
  *
  * @param {number} retry - The retry number.
  * @param {number} minDelay - The minimal delay in milliseconds.
  * @param {number} base - The exponent base.
  * @returns {number} - The amount of waiting before trying another time given in milliseconds.
  * @private
  */
  export function getJitterDelay(retry: number, minDelay?: number, base?: number): number;

}
declare module '@lyno/lib-jitsi-meet/modules/util/ScriptUtil' {
  /**
   * Loads a script from a specific source.
   *
   * @param src the source from the which the script is to be (down)loaded
   * @param async true to asynchronously load the script or false to
   * synchronously load the script
   * @param prepend true to schedule the loading of the script as soon as
   * possible or false to schedule the loading of the script at the end of the
   * scripts known at the time
   * @param relativeURL whether we need load the library from url relative
   * to the url that lib-jitsi-meet was loaded. Useful when sourcing the
   * library from different location than the app that is using it
   * @param loadCallback on load callback function
   * @param errorCallback callback to be called on error loading the script
   */
  export function loadScript(src: any, async: any, prepend: any, relativeURL: any, loadCallback: any, errorCallback: any): void;
  /**
   * Loads a script from a specific source.
   *
   * @param src the source from the which the script is to be (down)loaded
   * @param async true to asynchronously load the script or false to
   * synchronously load the script
   * @param prepend true to schedule the loading of the script as soon as
   * possible or false to schedule the loading of the script at the end of the
   * scripts known at the time
   * @param relativeURL whether we need load the library from url relative
   * to the url that lib-jitsi-meet was loaded. Useful when sourcing the
   * library from different location than the app that is using it
   * @param loadCallback on load callback function
   * @param errorCallback callback to be called on error loading the script
   */
  export function loadScript(src: any, async: any, prepend: any, relativeURL: any, loadCallback: any, errorCallback: any): void;

}
declare module '@lyno/lib-jitsi-meet/modules/util/StringUtils' {
  /**
   * Implements a simple hash code for a string (see
   * https://en.wikipedia.org/wiki/Java_hashCode()).
   *
   * @param {string} The string to return a hash of.
   * @return {Number} the integer hash code of the string.
   */
  export function integerHash(string: any): number;

}
declare module '@lyno/lib-jitsi-meet/modules/util/TestUtils' {
  /**
   * Returns a Promise resolved after {@code process.nextTick} with the option to advance Jasmine timers.
   *
   * @param {number} [advanceTimer] - the value to be passed to Jasmine clock's tick method.
   * @returns {Promise<void>}
   */
  export function nextTick(advanceTimer?: number): Promise<void>;

}
declare module '@lyno/lib-jitsi-meet/modules/util/UsernameGenerator' {
  /**
   * Generate random username.
   * @returns {string} random username
   */
  export function generateUsername(): string;

}
declare module '@lyno/lib-jitsi-meet/modules/version/ComponentsVersions' {
  /**
   * Creates new instance of <tt>ComponentsVersions</tt> which will be discovering
   * the versions of conferencing system components in given
   * <tt>JitsiConference</tt>.
   * @param conference <tt>JitsiConference</tt> instance which will be used to
   *        listen for focus presence updates.
   * @constructor
   */
  export default function ComponentsVersions(conference: any): void;
  export default class ComponentsVersions {
      /**
       * Creates new instance of <tt>ComponentsVersions</tt> which will be discovering
       * the versions of conferencing system components in given
       * <tt>JitsiConference</tt>.
       * @param conference <tt>JitsiConference</tt> instance which will be used to
       *        listen for focus presence updates.
       * @constructor
       */
      constructor(conference: any);
      versions: {};
      conference: any;
      processVersions(versions: any, mucResource: any, mucJid: any): void;
      getComponentVersion(componentName: any): string;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/videosipgw/JitsiVideoSIPGWSession' {
  /**
   * Jitsi video SIP GW session. Holding its state and able to start/stop it.
   * When session is in OFF or FAILED stated it cannot be used anymore.
   */
  export default class JitsiVideoSIPGWSession extends Listenable {
      /**
       * Creates new session with the desired sip address and display name.
       *
       * @param {string} sipAddress - The sip address to use when
       * starting the session.
       * @param {string} displayName - The display name to use for
       * that participant.
       * @param {ChatRoom} chatRoom - The chat room this session is bound to.
       */
      constructor(sipAddress: string, displayName: string, chatRoom: any);
      sipAddress: string;
      displayName: string;
      chatRoom: any;
      state: any;
      /**
       * Stops the current session.
       */
      stop(): void;
      /**
       * Starts a new session. Sends an iq to the focus.
       */
      start(): void;
      /**
       * Changes the state of this session.
       *
       * @param {string} newState - The new {VideoSIPGWConstants} state to set.
       * @param {string} [optional] failureReason - The reason why a failure state
       * was entered.
       * @returns {void}
       */
      setState(newState: string, failureReason: any): void;
      /**
       * Subscribes the passed listener to the event for state change of this
       * session.
       *
       * @param {Function} listener - The function that will receive the event.
       */
      addStateListener(listener: Function): void;
      /**
       * Unsubscribes the passed handler.
       *
       * @param {Function} listener - The function to be removed.
       */
      removeStateListener(listener: Function): void;
      /**
       * Sends a jibri command using an iq.
       *
       * @private
       * @param {string} action - The action to send ('start' or 'stop').
       */
      private _sendJibriIQ;
  }
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";

}
declare module '@lyno/lib-jitsi-meet/modules/videosipgw/VideoSIPGW' {
  /**
   * Main video SIP GW handler. Stores references of all created sessions.
   */
  export default class VideoSIPGW {
      /**
       * Creates new handler.
       *
       * @param {ChatRoom} chatRoom - Tha chat room to handle.
       */
      constructor(chatRoom: any);
      chatRoom: any;
      eventEmitter: any;
      sessions: {};
      sessionStateChangeListener: any;
      /**
       * Handles presence nodes with name: jibri-sip-call-state.
       *
       * @param {Object} node the presence node Object to handle.
       * Object representing part of the presence received over xmpp.
       */
      handleJibriSIPState(node: any): void;
      /**
       * Creates new session and stores its reference if it does not exist or
       * returns an error otherwise.
       *
       * @param {string} sipAddress - The sip address to use.
       * @param {string} displayName - The display name to use.
       * @returns {JitsiVideoSIPGWSession|Error}
       */
      createVideoSIPGWSession(sipAddress: string, displayName: string): JitsiVideoSIPGWSession | Error;
      /**
       * Listener for session state changed. When a session goes to off or failed
       * we delete its reference.
       *
       * @param {options} event - { address, oldState, newState, displayName }
       */
      sessionStateChanged(event: any): void;
  }
  import JitsiVideoSIPGWSession from "@lyno/lib-jitsi-meet/modules/videosipgw/JitsiVideoSIPGWSession";

}
declare module '@lyno/lib-jitsi-meet/modules/videosipgw/VideoSIPGWConstants' {
  /**
   * Status that video SIP GW service is available.
   * @type {string}
   */
  export const STATUS_AVAILABLE: string;
  /**
   * Status that video SIP GW service is not available.
   * @type {string}
   */
  export const STATUS_UNDEFINED: string;
  /**
   * Status that video SIP GW service is available but there are no free nodes
   * at the moment to serve new requests.
   * @type {string}
   */
  export const STATUS_BUSY: string;
  /**
   * Video SIP GW session state, currently running.
   * @type {string}
   */
  export const STATE_ON: string;
  /**
   * Video SIP GW session state, currently stopped and not running.
   * @type {string}
   */
  export const STATE_OFF: string;
  /**
   * Video SIP GW session state, currently is starting.
   * @type {string}
   */
  export const STATE_PENDING: string;
  /**
   * Video SIP GW session state, has observed some issues and is retrying at the
   * moment.
   * @type {string}
   */
  export const STATE_RETRYING: string;
  /**
   * Video SIP GW session state, tried to start but it failed.
   * @type {string}
   */
  export const STATE_FAILED: string;
  /**
   * Error on trying to create video SIP GW session in conference where
   * there is no room connection (hasn't joined or has left the room).
   * @type {string}
   */
  export const ERROR_NO_CONNECTION: string;
  /**
   * Error on trying to create video SIP GW session with address for which
   * there is an already created session.
   * @type {string}
   */
  export const ERROR_SESSION_EXISTS: string;

}
declare module '@lyno/lib-jitsi-meet/modules/webaudio/AudioMixer' {
  /**
   * The AudioMixer, as the name implies, mixes a number of MediaStreams containing audio tracks into a single
   * MediaStream.
   */
  export default class AudioMixer {
      _started: boolean;
      _streamsToMix: any[];
      _streamMSSArray: any[];
      /**
       * Add audio MediaStream to be mixed, if the stream doesn't contain any audio tracks it will be ignored.
       *
       * @param {MediaStream} stream - MediaStream to be mixed.
       */
      addMediaStream(stream: MediaStream): void;
      /**
       * At this point a WebAudio ChannelMergerNode is created and and the two associated MediaStreams are connected to
       * it; the resulting mixed MediaStream is returned.
       *
       * @returns {MediaStream} - MediaStream containing added streams mixed together, or null if no MediaStream
       * is added.
       */
      start(): MediaStream;
      _audioContext: AudioContext;
      _mixedMSD: MediaStreamAudioDestinationNode;
      /**
       * Disconnect MediaStreamAudioSourceNode and clear references.
       *
       * @returns {void}
       */
      reset(): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/webaudio/WebAudioUtils' {
  /**
   * Adapter that creates AudioContext objects depending on the browser.
   *
   * @returns {AudioContext} - Return a new AudioContext or undefined if the browser does not support it.
   */
  export function createAudioContext(options: any): AudioContext;

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/Caps' {
  export const ERROR_FEATURE_VERSION_MISMATCH: "Feature version mismatch";
  /**
   * Implements xep-0115 ( http://xmpp.org/extensions/xep-0115.html )
   */
  export default class Caps extends Listenable {
      /**
       * Constructs new Caps instance.
       * @param {Strophe.Connection} connection the strophe connection object
       * @param {String} node the value of the node attribute of the "c" xml node
       * that will be sent to the other participants
       */
      constructor(connection?: any, node?: string);
      node: string;
      disco: any;
      versionToCapabilities: any;
      jidToVersion: any;
      version: string;
      rooms: Set<any>;
      externalFeatures: Set<any>;
      _onMucMemberLeft: any;
      /**
       * Adds new feature to the list of supported features for the local
       * participant
       * @param {String} feature the name of the feature.
       * @param {boolean} submit if true - new presence with updated "c" node
       * will be sent.
       * @param {boolean} external whether this feature was added externally to the library.
       * We put features used directly by the clients (is jibri, remote-control enabled etc.) in the presence
       * to avoid additional disco-info queries by those clients.
       */
      addFeature(feature: string, submit?: boolean, external?: boolean): void;
      /**
       * Removes a feature from the list of supported features for the local
       * participant
       * @param {String} feature the name of the feature.
       * @param {boolean} submit if true - new presence with updated "c" node
       * will be sent.
       * @param {boolean} external whether this feature was added externally to the library.
       */
      removeFeature(feature: string, submit?: boolean, external?: boolean): void;
      /**
       * Sends new presence stanza for every room from the list of rooms.
       */
      submit(): void;
      /**
       * Updates the presences in the room based on the current values in externalFeatures.
       * @param {ChatRoom} room the room to update.
       * @private
       */
      private _updateRoomWithExternalFeatures;
      /**
       * Returns a set with the features for a participant.
       * @param {String} jid the jid of the participant
       * @param {int} timeout the timeout in ms for reply from the participant.
       * @returns {Promise<Set<String>, Error>}
       */
      getFeatures(jid: string, timeout?: any): Promise<Set<string>, Error>;
      /**
       * Returns a set with the features for a host.
       * @param {String} jid the jid of the host
       * @param {int} timeout the timeout in ms for reply from the host.
       * @returns {Promise<Set<String>, Error>}
       */
      getFeaturesAndIdentities(jid: string, node: any, timeout?: any): Promise<Set<string>, Error>;
      /**
       * Returns a set with the features and identities for a host.
       * @param {String} jid the jid of the host
       * @param {String|null} node the node to query
       * @param {int} timeout the timeout in ms for reply from the host.
       * @returns {Promise<Object>}
       * @private
       */
      private _getDiscoInfo;
      /**
       * Adds ChatRoom instance to the list of rooms. Adds listeners to the room
       * and adds "c" element to the presences of the room.
       * @param {ChatRoom} room the room.
       */
      _addChatRoom(room: any): void;
      /**
       * Removes ChatRoom instance from the list of rooms. Removes listeners
       * added from the Caps class.
       * @param {ChatRoom} room the room.
       */
      _removeChatRoom(room: any): void;
      /**
       * Creates/updates the "c" xml node into the presence of the passed room.
       * @param {ChatRoom} room the room.
       */
      _fixChatRoomPresenceMap(room: any): void;
      /**
       * Handles this.version changes.
       */
      _notifyVersionChanged(): void;
      /**
       * Generates the value for the "ver" attribute.
       */
      _generateVersion(): void;
      /**
       * Parses the "c" xml node from presence.
       * @param {DOMElement} stanza the presence packet
       */
      _handleCaps(stanza: any): boolean;
      /**
       * Removes entry from this.jidToVersion map.
       * @param {String} jid the jid to be removed.
       */
      _removeJidToVersionEntry(jid: string): void;
  }
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/ChatRoom' {
  export namespace parser {
      function packet2JSON(xmlElement: any, nodes: any): void;
      function packet2JSON(xmlElement: any, nodes: any): void;
      function json2packet(nodes: any, packet: any): void;
      function json2packet(nodes: any, packet: any): void;
  }
  /**
   *
   */
  export default class ChatRoom extends Listenable {
      /**
       *
       * @param {XmppConnection} connection - The XMPP connection instance.
       * @param jid
       * @param password
       * @param XMPP
       * @param options
       * @param {boolean} options.disableFocus - when set to {@code false} will
       * not invite Jicofo into the room.
       * @param {boolean} options.disableDiscoInfo - when set to {@code false} will skip disco info.
       * This is intended to be used only for lobby rooms.
       * @param {boolean} options.enableLobby - when set to {@code false} will skip creating lobby room.
       */
      constructor(connection: XmppConnection, jid: any, password: any, XMPP: any, options: any);
      xmpp: any;
      connection: XmppConnection;
      roomjid: any;
      myroomjid: any;
      password: any;
      members: {};
      presMap: {};
      presHandlers: {};
      _removeConnListeners: any[];
      joined: boolean;
      role: any;
      focusMucJid: any;
      noBridgeAvailable: boolean;
      options: any;
      moderator: Moderator;
      lobby: Lobby;
      lastPresences: {};
      phoneNumber: any;
      phonePin: any;
      connectionTimes: {};
      participantPropertyListener: any;
      locked: boolean;
      transcriptionStatus: string;
      /**
       *
       */
      initPresenceMap(options?: {}): void;
      presenceUpdateTime: number;
      /**
       * Joins the chat room.
       * @param {string} password - Password to unlock room on joining.
       * @returns {Promise} - resolved when join completes. At the time of this
       * writing it's never rejected.
       */
      join(password: string): Promise<any>;
      /**
       *
       * @param fromJoin - Whether this is initial presence to join the room.
       */
      sendPresence(fromJoin: any): void;
      presenceSyncTime: number;
      /**
       * Sends the presence unavailable, signaling the server
       * we want to leave the room.
       */
      doLeave(): void;
      /**
       *
       */
      discoRoomInfo(): void;
      membersOnlyEnabled: any;
      /**
       * Sets the meeting unique Id (received from the backend).
       *
       * @param {string} meetingId - The new meetings id.
       * @returns {void}
       */
      setMeetingId(meetingId: string): void;
      meetingId: any;
      /**
       *
       */
      createNonAnonymousRoom(): void;
      /**
       * Handles Xmpp Connection status updates.
       *
       * @param {Strophe.Status} status - The Strophe connection status.
       */
      onConnStatusChanged(status: any): void;
      /**
       *
       * @param pres
       */
      onPresence(pres: any): void;
      restartByTerminateSupported: boolean;
      /**
       * Extracts the features from the presence.
       * @param node the node to process.
       * @return features the Set of features where extracted data is added.
       * @private
       */
      private _extractFeatures;
      /**
       * Initialize some properties when the focus participant is verified.
       * @param from jid of the focus
       * @param features the features reported in jicofo presence
       */
      _initFocus(from: any, features: any): void;
      focusFeatures: any;
      /**
       * Sets the special listener to be used for "command"s whose name starts
       * with "jitsi_participant_".
       */
      setParticipantPropertyListener(listener: any): void;
      /**
       * Checks if Jicofo supports restarting Jingle session after 'session-terminate'.
       * @returns {boolean}
       */
      supportsRestartByTerminate(): boolean;
      /**
       *
       * @param node
       * @param from
       */
      processNode(node: any, from: any): void;
      /**
       * Send text message to the other participants in the conference
       * @param message
       * @param elementName
       * @param nickname
       */
      sendMessage(message: any, elementName: any, nickname: any): void;
      /**
       * Send private text message to another participant of the conference
       * @param id id/muc resource of the receiver
       * @param message
       * @param elementName
       * @param nickname
       */
      sendPrivateMessage(id: any, message: any, elementName: any, nickname: any): void;
      /**
       *
       * @param subject
       */
      setSubject(subject: any): void;
      /**
       * Called when participant leaves.
       * @param jid the jid of the participant that leaves
       * @param skipEvents optional params to skip any events, including check
       * whether this is the focus that left
       */
      onParticipantLeft(jid: any, skipEvents: any): void;
      /**
       *
       * @param pres
       * @param from
       */
      onPresenceUnavailable(pres: any, from: any): boolean;
      /**
       *
       * @param msg
       * @param from
       */
      onMessage(msg: any, from: any): boolean;
      /**
       *
       * @param pres
       * @param from
       */
      onPresenceError(pres: any, from: any): void;
      /**
       *
       * @param jid
       * @param affiliation
       */
      setAffiliation(jid: any, affiliation: any): void;
      /**
       *
       * @param jid
       */
      kick(jid: any): void;
      /**
       *
       * @param key
       * @param onSuccess
       * @param onError
       * @param onNotSupported
       */
      lockRoom(key: any, onSuccess: any, onError: any, onNotSupported: any): void;
      /**
       * Turns off or on the members only config for the main room.
       *
       * @param {boolean} enabled - Whether to turn it on or off.
       * @param onSuccess - optional callback.
       * @param onError - optional callback.
       */
      setMembersOnly(enabled: boolean, onSuccess: any, onError: any): void;
      /**
       * Adds the key to the presence map, overriding any previous value.
       * @param key
       * @param values
       */
      addToPresence(key: any, values: any): void;
      /**
       * Retrieves a value from the presence map.
       *
       * @param {string} key - The key to find the value for.
       * @returns {Object?}
       */
      getFromPresence(key: string): any | null;
      /**
       * Removes a key from the presence map.
       * @param key
       */
      removeFromPresence(key: any): void;
      /**
       *
       * @param name
       * @param handler
       */
      addPresenceListener(name: any, handler: any): void;
      /**
       *
       * @param name
       * @param handler
       */
      removePresenceListener(name: any, handler: any): void;
      /**
       * Checks if the user identified by given <tt>mucJid</tt> is the conference
       * focus.
       * @param mucJid the full MUC address of the user to be checked.
       * @returns {boolean|null} <tt>true</tt> if MUC user is the conference focus
       * or <tt>false</tt> if is not. When given <tt>mucJid</tt> does not exist in
       * the MUC then <tt>null</tt> is returned.
       */
      isFocus(mucJid: any): boolean | null;
      /**
       *
       */
      isModerator(): boolean;
      /**
       *
       * @param peerJid
       */
      getMemberRole(peerJid: any): any;
      /**
       *
       * @param mute
       * @param callback
       */
      setVideoMute(mute: any, callback: any): void;
      /**
       *
       * @param mute
       * @param callback
       */
      setAudioMute(mute: any, callback: any): void;
      /**
       *
       * @param mute
       */
      addAudioInfoToPresence(mute: any): void;
      /**
       *
       * @param mute
       * @param callback
       */
      sendAudioInfoPresence(mute: any, callback: any): void;
      /**
       *
       * @param mute
       */
      addVideoInfoToPresence(mute: any): void;
      /**
       *
       * @param mute
       */
      sendVideoInfoPresence(mute: any): void;
      /**
       * Obtains the info about given media advertised in the MUC presence of
       * the participant identified by the given endpoint JID.
       * @param {string} endpointId the endpoint ID mapped to the participant
       * which corresponds to MUC nickname.
       * @param {MediaType} mediaType the type of the media for which presence
       * info will be obtained.
       * @return {PeerMediaInfo} presenceInfo an object with media presence
       * info or <tt>null</tt> either if there is no presence available or if
       * the media type given is invalid.
       */
      getMediaPresenceInfo(endpointId: string, mediaType: typeof MediaType): any;
      /**
       * Returns true if the SIP calls are supported and false otherwise
       */
      isSIPCallingSupported(): boolean;
      /**
       * Dials a number.
       * @param number the number
       */
      dial(number: any): any;
      /**
       * Hangup an existing call
       */
      hangup(): any;
      /**
       *
       * @returns {Lobby}
       */
      getLobby(): Lobby;
      /**
       * Returns the phone number for joining the conference.
       */
      getPhoneNumber(): any;
      /**
       * Returns the pin for joining the conference with phone.
       */
      getPhonePin(): any;
      /**
       * Returns the meeting unique ID if any came from backend.
       *
       * @returns {string} - The meeting ID.
       */
      getMeetingId(): string;
      /**
       * Mutes remote participant.
       * @param jid of the participant
       * @param mute
       */
      muteParticipant(jid: any, mute: any): void;
      /**
       * TODO: Document
       * @param iq
       */
      onMute(iq: any): void;
      /**
       * Clean any listeners or resources, executed on leaving.
       */
      clean(): void;
      /**
       * Leaves the room. Closes the jingle session.
       * @returns {Promise} which is resolved if XMPPEvents.MUC_LEFT is received
       * less than 5s after sending presence unavailable. Otherwise the promise is
       * rejected.
       */
      leave(): Promise<any>;
  }
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";
  import XmppConnection from "@lyno/lib-jitsi-meet/modules/xmpp/XmppConnection";
  import Moderator from "@lyno/lib-jitsi-meet/modules/xmpp/moderator";
  import Lobby from "@lyno/lib-jitsi-meet/modules/xmpp/Lobby";
  import * as MediaType from "@lyno/lib-jitsi-meet/service/RTC/MediaType";

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/ConnectionPlugin' {
  var _default: {
      new (...args: any[]): {
          connection: any;
          /**
           *
           * @param connection
           */
          init(connection: any): void;
      };
  };
  export default _default;
  /**
   * ConnectionPlugin class that extends Listenable.
   */
  export const ConnectionPluginListenable: {
      new (...args: any[]): {
          connection: any;
          /**
           *
           * @param connection
           */
          init(connection: any): void;
      };
  };

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/JingleSession' {
  /**
   * JingleSession provides an API to manage a single Jingle session. We will
   * have different implementations depending on the underlying interface used
   * (i.e. WebRTC and ORTC) and here we hold the code common to all of them.
   */
  export default class JingleSession extends Listenable {
      /**
       * Creates new <tt>JingleSession</tt>.
       * @param {string} sid the Jingle session identifier
       * @param {string} localJid our JID
       * @param {string} remoteJid the JID of the remote peer
       * @param {XmppConnection} connection the XMPP connection
       * @param {Object} mediaConstraints the media constraints object passed to
       * the PeerConnection onCreateAnswer/Offer as defined by the WebRTC.
       * @param {Object} iceConfig the ICE servers config object as defined by
       * the WebRTC. Passed to the PeerConnection's constructor.
       * @param {boolean} isInitiator indicates if it will be the side which
       * initiates the session.
       */
      constructor(sid: string, localJid: string, remoteJid: string, connection: any, mediaConstraints: any, iceConfig: any, isInitiator: boolean);
      sid: string;
      localJid: string;
      remoteJid: string;
      connection: any;
      mediaConstraints: any;
      iceConfig: any;
      /**
       * Indicates whether this instance is an initiator or an answerer of
       * the Jingle session.
       * @type {boolean}
       */
      isInitiator: boolean;
      /**
       * Whether to use dripping or not. Dripping is sending trickle
       * candidates not one-by-one.
       */
      usedrip: boolean;
      /**
       *  When dripping is used, stores ICE candidates which are to be sent.
       */
      dripContainer: any[];
      /**
       * The chat room instance associated with the session.
       * @type {ChatRoom}
       */
      room: any;
      /**
       * Jingle session state - uninitialized until {@link initialize} is
       * called @type {JingleSessionState}
       */
      state: string;
      /**
       * The RTC service instance
       * @type {RTC}
       */
      rtc: any;
      /**
       * Returns XMPP address of this session's initiator.
       * @return {string}
       */
      get initiatorJid(): string;
      /**
       * Returns XMPP address of this session's responder.
       * @return {string}
       */
      get responderJid(): string;
      /**
       * Prepares this object to initiate a session.
       * @param {ChatRoom} room the chat room for the conference associated with
       * this session
       * @param {RTC} rtc the RTC service instance
       * @param {object} options - the options, see implementing class's
       * {@link #doInitialize} description for more details.
       */
      initialize(room: any, rtc: any, options: object): void;
      /**
       * The implementing class finishes initialization here. Called at the end of
       * {@link initialize}.
       * @param {Object} options - The options specific to the implementing class.
       * @protected
       */
      protected doInitialize(options: any): void;
      /**
       * Adds the ICE candidates found in the 'contents' array as remote
       * candidates?
       * Note: currently only used on transport-info
       *
       * @param contents
       */
      addIceCandidates(contents: any): void;
      /**
       * Returns current state of this <tt>JingleSession</tt> instance.
       * @returns {JingleSessionState} the current state of this session instance.
       */
      getState(): typeof JingleSessionState;
      /**
       * Handles an 'add-source' event.
       *
       * @param contents an array of Jingle 'content' elements.
       */
      addSources(contents: any): void;
      /**
       * Handles a 'remove-source' event.
       *
       * @param contents an array of Jingle 'content' elements.
       */
      removeSources(contents: any): void;
      /**
       * Terminates this Jingle session by sending session-terminate
       * @param success a callback called once the 'session-terminate' packet has
       * been acknowledged with RESULT.
       * @param failure a callback called when either timeout occurs or ERROR
       * response is received.
       * @param {Object} options
       * @param {string} [options.reason] XMPP Jingle error condition
       * @param {string} [options.reasonDescription] some meaningful error message
       * @param {boolean} [options.requestRestart=false] set to true to ask Jicofo to start a new session one this once is
       * terminated.
       * @param {boolean} [options.sendSessionTerminate=true] set to false to skip
       * sending session-terminate. It may not make sense to send it if the XMPP
       * connection has been closed already or if the remote peer has disconnected
       */
      terminate(success: any, failure: any, options: {
          reason?: string;
          reasonDescription?: string;
          requestRestart?: boolean;
          sendSessionTerminate?: boolean;
      }): void;
      /**
       * Handles an offer from the remote peer (prepares to accept a session).
       * @param jingle the 'jingle' XML element.
       * @param success callback called when we the incoming session has been
       * accepted
       * @param failure callback called when we fail for any reason, will supply
       * error object with details(which is meant more to be printed to the logger
       * than analysed in the code, as the error is unrecoverable anyway)
       */
      acceptOffer(jingle: any, success: any, failure: any): void;
      /**
       * Returns the JID of the initiator of the jingle session.
       */
      _getInitiatorJid(): string;
  }
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";
  import * as JingleSessionState from "@lyno/lib-jitsi-meet/modules/xmpp/JingleSessionState";

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/JingleSessionPC' {
  /**
   * @typedef {Object} JingleSessionPCOptions
   * @property {Object} abTesting - A/B testing related options (ask George).
   * @property {boolean} abTesting.enableSuspendVideoTest - enables the suspend
   * video test ?(ask George).
   * @property {boolean} disableH264 - Described in the config.js[1].
   * @property {boolean} disableRtx - Described in the config.js[1].
   * @property {boolean} disableSimulcast - Described in the config.js[1].
   * @property {boolean} enableInsertableStreams - Set to true when the insertable streams constraints is to be enabled
   * on the PeerConnection.
   * @property {boolean} enableLayerSuspension - Described in the config.js[1].
   * @property {boolean} failICE - it's an option used in the tests. Set to
   * <tt>true</tt> to block any real candidates and make the ICE fail.
   * @property {boolean} gatherStats - Described in the config.js[1].
   * @property {object} p2p - Peer to peer related options (FIXME those could be
   * fetched from config.p2p on the upper level).
   * @property {boolean} p2p.disableH264 - Described in the config.js[1].
   * @property {boolean} p2p.preferH264 - Described in the config.js[1].
   * @property {boolean} preferH264 - Described in the config.js[1].
   * @property {Object} testing - Testing and/or experimental options.
   * @property {boolean} webrtcIceUdpDisable - Described in the config.js[1].
   * @property {boolean} webrtcIceTcpDisable - Described in the config.js[1].
   *
   * [1]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
   */
  /**
   *
   */
  export default class JingleSessionPC extends JingleSession {
      /**
       * Parses 'senders' attribute of the video content.
       * @param {jQuery} jingleContents
       * @return {string|null} one of the values of content "senders" attribute
       * defined by Jingle. If there is no "senders" attribute or if the value is
       * invalid then <tt>null</tt> will be returned.
       * @private
       */
      private static parseVideoSenders;
      /**
       * Parses the video max frame height value out of the 'content-modify' IQ.
       *
       * @param {jQuery} jingleContents - A jQuery selector pointing to the '>jingle' element.
       * @returns {Number|null}
       */
      static parseMaxFrameHeight(jingleContents: any): number | null;
      /**
       * Creates new <tt>JingleSessionPC</tt>
       * @param {string} sid the Jingle Session ID - random string which
       * identifies the session
       * @param {string} localJid our JID
       * @param {string} remoteJid remote peer JID
       * @param {XmppConnection} connection - The XMPP connection instance.
       * @param mediaConstraints the media constraints object passed to
       * createOffer/Answer, as defined by the WebRTC standard
       * @param iceConfig the ICE servers config object as defined by the WebRTC
       * standard.
       * @param {boolean} isP2P indicates whether this instance is
       * meant to be used in a direct, peer to peer connection or <tt>false</tt>
       * if it's a JVB connection.
       * @param {boolean} isInitiator indicates if it will be the side which
       * initiates the session.
       * @constructor
       *
       * @implements {SignalingLayer}
       */
      constructor(sid: string, localJid: string, remoteJid: string, connection: XmppConnection, mediaConstraints: any, iceConfig: any, isP2P: boolean, isInitiator: boolean);
      /**
       * The bridge session's identifier. One Jingle session can during
       * it's lifetime participate in multiple bridge sessions managed by
       * Jicofo. A new bridge session is started whenever Jicofo sends
       * 'session-initiate' or 'transport-replace'.
       *
       * @type {?string}
       * @private
       */
      private _bridgeSessionId;
      /**
       * The oldest SDP passed to {@link notifyMySSRCUpdate} while the XMPP connection was offline that will be
       * used to update Jicofo once the XMPP connection goes back online.
       * @type {SDP|undefined}
       * @private
       */
      private _cachedOldLocalSdp;
      /**
       * The latest SDP passed to {@link notifyMySSRCUpdate} while the XMPP connection was offline that will be
       * used to update Jicofo once the XMPP connection goes back online.
       * @type {SDP|undefined}
       * @private
       */
      private _cachedNewLocalSdp;
      /**
       * Stores result of {@link window.performance.now()} at the time when
       * ICE enters 'checking' state.
       * @type {number|null} null if no value has been stored yet
       * @private
       */
      private _iceCheckingStartedTimestamp;
      /**
       * Stores result of {@link window.performance.now()} at the time when
       * first ICE candidate is spawned by the peerconnection to mark when
       * ICE gathering started. That's, because ICE gathering state changed
       * events are not supported by most of the browsers, so we try something
       * that will work everywhere. It may not be as accurate, but given that
       * 'host' candidate usually comes first, the delay should be minimal.
       * @type {number|null} null if no value has been stored yet
       * @private
       */
      private _gatheringStartedTimestamp;
      /**
       * Local preference for the receive video max frame height.
       *
       * @type {Number|undefined}
       */
      localRecvMaxFrameHeight: number | undefined;
      /**
       * Indicates whether or not this session is willing to send/receive
       * video media. When set to <tt>false</tt> the underlying peer
       * connection will disable local video transfer and the remote peer will
       * be will be asked to stop sending video via 'content-modify' IQ
       * (the senders attribute of video contents will be adjusted
       * accordingly). Note that this notification is sent only in P2P
       * session, because Jicofo does not support it yet. Obviously when
       * the value is changed from <tt>false</tt> to <tt>true</tt> another
       * notification will be sent to resume video transfer on the remote
       * side.
       * @type {boolean}
       * @private
       */
      private _localVideoActive;
      /**
       * Indicates whether or not the remote peer has video transfer active.
       * When set to <tt>true</tt> it means that remote peer is neither
       * sending nor willing to receive video. In such case we'll ask
       * our peerconnection to stop sending video by calling
       * {@link TraceablePeerConnection.setVideoTransferActive} with
       * <tt>false</tt>.
       * @type {boolean}
       * @private
       */
      private _remoteVideoActive;
      /**
       * Marks that ICE gathering duration has been reported already. That
       * prevents reporting it again, after eventual 'transport-replace' (JVB
       * conference migration/ICE restart).
       * @type {boolean}
       * @private
       */
      private _gatheringReported;
      lasticecandidate: boolean;
      closed: boolean;
      /**
       * Indicates whether or not this <tt>JingleSessionPC</tt> is used in
       * a peer to peer type of session.
       * @type {boolean} <tt>true</tt> if it's a peer to peer
       * session or <tt>false</tt> if it's a JVB session
       */
      isP2P: boolean;
      /**
       * Remote preference for the receive video max frame height.
       *
       * @type {Number|undefined}
       */
      remoteRecvMaxFrameHeight: number | undefined;
      /**
       * The signaling layer implementation.
       * @type {SignalingLayerImpl}
       */
      signalingLayer: SignalingLayerImpl;
      /**
       * The queue used to serialize operations done on the peerconnection.
       *
       * @type {AsyncQueue}
       */
      modificationQueue: AsyncQueue;
      /**
       * Flag used to guarantee that the connection established event is
       * triggered just once.
       * @type {boolean}
       */
      wasConnected: boolean;
      /**
       * Keeps track of how long (in ms) it took from ICE start to ICE
       * connect.
       *
       * @type {number}
       */
      establishmentDuration: number;
      _xmppListeners: Function[];
      _removeSenderVideoConstraintsChangeListener: any;
      /**
       * Checks whether or not this session instance is still operational.
       * @private
       * @returns {boolean} {@code true} if operation or {@code false} otherwise.
       */
      private _assertNotEnded;
      failICE: boolean;
      options: JingleSessionPCOptions;
      /**
       * {@code true} if reconnect is in progress.
       * @type {boolean}
       */
      isReconnect: boolean;
      /**
       * Set to {@code true} if the connection was ever stable
       * @type {boolean}
       */
      wasstable: boolean;
      webrtcIceUdpDisable: boolean;
      webrtcIceTcpDisable: boolean;
      peerconnection: any;
      /**
       * Remote preference for receive video max frame height.
       *
       * @returns {Number|undefined}
       */
      getRemoteRecvMaxFrameHeight(): number | undefined;
      /**
       * Sends given candidate in Jingle 'transport-info' message.
       * @param {RTCIceCandidate} candidate the WebRTC ICE candidate instance
       * @private
       */
      private sendIceCandidate;
      /**
       * Sends given candidates in Jingle 'transport-info' message.
       * @param {Array<RTCIceCandidate>} candidates an array of the WebRTC ICE
       * candidate instances
       * @private
       */
      private sendIceCandidates;
      /**
       * Sends Jingle 'session-info' message which includes custom Jitsi Meet
       * 'ice-state' element with the text value 'failed' to let Jicofo know
       * that the ICE connection has entered the failed state. It can then
       * choose to re-create JVB channels and send 'transport-replace' to
       * retry the connection.
       */
      sendIceFailedNotification(): void;
      /**
       *
       * @param contents
       */
      readSsrcInfo(contents: any): void;
      /**
       * Makes the underlying TraceablePeerConnection generate new SSRC for
       * the recvonly video stream.
       * @deprecated
       */
      generateRecvonlySsrc(): void;
      /**
       * Creates an offer and sends Jingle 'session-initiate' to the remote peer.
       * @param {Array<JitsiLocalTrack>} localTracks the local tracks that will be
       * added, before the offer/answer cycle executes (for the local track
       * addition to be an atomic operation together with the offer/answer).
       */
      invite(localTracks?: Array<any>): void;
      /**
       * Sends 'session-initiate' to the remote peer.
       *
       * NOTE this method is synchronous and we're not waiting for the RESULT
       * response which would delay the startup process.
       *
       * @param {string} offerSdp  - The local session description which will be
       * used to generate an offer.
       * @private
       */
      private sendSessionInitiate;
      /**
       * Sets the answer received from the remote peer.
       * @param jingleAnswer
       */
      setAnswer(jingleAnswer: any): void;
      /**
       * This is a setRemoteDescription/setLocalDescription cycle which starts at
       * converting Strophe Jingle IQ into remote offer SDP. Once converted
       * setRemoteDescription, createAnswer and setLocalDescription calls follow.
       * @param jingleOfferAnswerIq jQuery selector pointing to the jingle element
       *        of the offer (or answer) IQ
       * @param success callback called when sRD/sLD cycle finishes successfully.
       * @param failure callback called with an error object as an argument if we
       *        fail at any point during setRD, createAnswer, setLD.
       * @param {Array<JitsiLocalTrack>} [localTracks] the optional list of
       * the local tracks that will be added, before the offer/answer cycle
       * executes (for the local track addition to be an atomic operation together
       * with the offer/answer).
       */
      setOfferAnswerCycle(jingleOfferAnswerIq: any, success: any, failure: any, localTracks?: Array<any>): void;
      /**
       * Although it states "replace transport" it does accept full Jingle offer
       * which should contain new ICE transport details.
       * @param jingleOfferElem an element Jingle IQ that contains new offer and
       *        transport info.
       * @param success callback called when we succeed to accept new offer.
       * @param failure function(error) called when we fail to accept new offer.
       */
      replaceTransport(jingleOfferElem: any, success: any, failure: any): void;
      /**
       * Sends Jingle 'session-accept' message.
       * @param {function()} success callback called when we receive 'RESULT'
       *        packet for the 'session-accept'
       * @param {function(error)} failure called when we receive an error response
       *        or when the request has timed out.
       * @private
       */
      private sendSessionAccept;
      /**
       * Will send 'content-modify' IQ in order to ask the remote peer to
       * either stop or resume sending video media or to adjust sender's video constraints.
       * @private
       */
      private sendContentModify;
      /**
       * Adjust the preference for max video frame height that the local party is willing to receive. Signals
       * the remote party.
       *
       * @param {Number} maxFrameHeight - the new value to set.
       */
      setReceiverVideoConstraint(maxFrameHeight: number): void;
      /**
       * Sends Jingle 'transport-accept' message which is a response to
       * 'transport-replace'.
       * @param localSDP the 'SDP' object with local session description
       * @param success callback called when we receive 'RESULT' packet for
       *        'transport-replace'
       * @param failure function(error) called when we receive an error response
       *        or when the request has timed out.
       * @private
       */
      private sendTransportAccept;
      /**
       * Sends Jingle 'transport-reject' message which is a response to
       * 'transport-replace'.
       * @param success callback called when we receive 'RESULT' packet for
       *        'transport-replace'
       * @param failure function(error) called when we receive an error response
       *        or when the request has timed out.
       *
       * FIXME method should be marked as private, but there's some spaghetti that
       *       needs to be fixed prior doing that
       */
      sendTransportReject(success: any, failure: any): void;
      /**
       * Sets the maximum bitrates on the local video track. Bitrate values from
       * videoQuality settings in config.js will be used for configuring the sender.
       * @returns {Promise<void>} promise that will be resolved when the operation is
       * successful and rejected otherwise.
       */
      setSenderMaxBitrates(): Promise<void>;
      /**
       * Sets the resolution constraint on the local camera track.
       * @param {number} maxFrameHeight - The user preferred max frame height.
       * @returns {Promise} promise that will be resolved when the operation is
       * successful and rejected otherwise.
       */
      setSenderVideoConstraint(maxFrameHeight: number): Promise<any>;
      /**
       * Sets the degradation preference on the video sender. This setting determines if
       * resolution or framerate will be preferred when bandwidth or cpu is constrained.
       * @returns {Promise<void>} promise that will be resolved when the operation is
       * successful and rejected otherwise.
       */
      setSenderVideoDegradationPreference(): Promise<void>;
      /**
       *
       * @param reasonCondition
       * @param reasonText
       */
      onTerminated(reasonCondition: any, reasonText: any): void;
      /**
       * Handles XMPP connection state changes.
       *
       * @param {XmppConnection.Status} status - The new status.
       */
      onXmppStatusChanged(status: any): void;
      /**
       * Parse the information from the xml sourceAddElem and translate it
       *  into sdp lines
       * @param {jquery xml element} sourceAddElem the source-add
       *  element from jingle
       * @param {SDP object} currentRemoteSdp the current remote
       *  sdp (as of this new source-add)
       * @returns {list} a list of SDP line strings that should
       *  be added to the remote SDP
       */
      _parseSsrcInfoFromSourceAdd(sourceAddElem: any, currentRemoteSdp: any): any;
      /**
       * Handles a Jingle source-add message for this Jingle session.
       * @param elem An array of Jingle "content" elements.
       */
      addRemoteStream(elem: any): void;
      /**
       * Handles a Jingle source-remove message for this Jingle session.
       * @param elem An array of Jingle "content" elements.
       */
      removeRemoteStream(elem: any): void;
      /**
       * Handles either Jingle 'source-add' or 'source-remove' message for this
       * Jingle session.
       * @param {boolean} isAdd <tt>true</tt> for 'source-add' or <tt>false</tt>
       * otherwise.
       * @param {Array<Element>} elem an array of Jingle "content" elements.
       * @private
       */
      private _addOrRemoveRemoteStream;
      /**
       * Takes in a jingle offer iq, returns the new sdp offer
       * @param {jquery xml element} offerIq the incoming offer
       * @returns {SDP object} the jingle offer translated to SDP
       */
      _processNewJingleOfferIq(offerIq: any): SDP;
      /**
       * Remove the given ssrc lines from the current remote sdp
       * @param {list} removeSsrcInfo a list of SDP line strings that
       *  should be removed from the remote SDP
       * @returns type {SDP Object} the new remote SDP (after removing the lines
       *  in removeSsrcInfo
       */
      _processRemoteRemoveSource(removeSsrcInfo: any): SDP;
      /**
       * Add the given ssrc lines to the current remote sdp
       * @param {list} addSsrcInfo a list of SDP line strings that
       *  should be added to the remote SDP
       * @returns type {SDP Object} the new remote SDP (after removing the lines
       *  in removeSsrcInfo
       */
      _processRemoteAddSource(addSsrcInfo: any): SDP;
      /**
       * Do a new o/a flow using the existing remote description
       * @param {string} [optionalRemoteSdp] optional, raw remote sdp
       *  to use.  If not provided, the remote sdp from the
       *  peerconnection will be used
       * @returns {Promise} promise which resolves when the
       *  o/a flow is complete with no arguments or
       *  rejects with an error {string}
       */
      _renegotiate(optionalRemoteSdp?: string): Promise<any>;
      /**
       * Renegotiate cycle implementation for the responder case.
       * @param {object} remoteDescription the SDP object as defined by the WebRTC
       * which will be used as remote description in the cycle.
       * @private
       */
      private _responderRenegotiate;
      /**
       * Renegotiate cycle implementation for the initiator's case.
       * @param {object} remoteDescription the SDP object as defined by the WebRTC
       * which will be used as remote description in the cycle.
       * @private
       */
      private _initiatorRenegotiate;
      /**
       * Replaces <tt>oldTrack</tt> with <tt>newTrack</tt> and performs a single
       * offer/answer cycle after both operations are done. Either
       * <tt>oldTrack</tt> or <tt>newTrack</tt> can be null; replacing a valid
       * <tt>oldTrack</tt> with a null <tt>newTrack</tt> effectively just removes
       * <tt>oldTrack</tt>
       * @param {JitsiLocalTrack|null} oldTrack the current track in use to be
       * replaced
       * @param {JitsiLocalTrack|null} newTrack the new track to use
       * @returns {Promise} which resolves once the replacement is complete
       *  with no arguments or rejects with an error {string}
       */
      replaceTrack(oldTrack: any | null, newTrack: any | null): Promise<any>;
      /**
       * Parse the information from the xml sourceRemoveElem and translate it
       *  into sdp lines
       * @param {jquery xml element} sourceRemoveElem the source-remove
       *  element from jingle
       * @param {SDP object} currentRemoteSdp the current remote
       *  sdp (as of this new source-remove)
       * @returns {list} a list of SDP line strings that should
       *  be removed from the remote SDP
       */
      _parseSsrcInfoFromSourceRemove(sourceRemoveElem: any, currentRemoteSdp: any): any;
      /**
       * Will print an error if there is any difference, between the SSRCs given
       * in the <tt>oldSDP</tt> and the ones currently described in
       * the peerconnection's local description.
       * @param {string} operationName the operation's name which will be printed
       * in the error message.
       * @param {SDP} oldSDP the old local SDP which will be compared with
       * the current one.
       * @return {boolean} <tt>true</tt> if there was any change or <tt>false</tt>
       * otherwise.
       * @private
       */
      private _verifyNoSSRCChanged;
      /**
       * Adds local track back to this session, as part of the unmute operation.
       * @param {JitsiLocalTrack} track
       * @return {Promise} a promise that will resolve once the local track is
       * added back to this session and renegotiation succeeds. Will be rejected
       * with a <tt>string</tt> that provides some error details in case something
       * goes wrong.
       */
      addTrackAsUnmute(track: any): Promise<any>;
      /**
       * Remove local track as part of the mute operation.
       * @param {JitsiLocalTrack} track the local track to be removed
       * @return {Promise} a promise which will be resolved once the local track
       * is removed from this session and the renegotiation is performed.
       * The promise will be rejected with a <tt>string</tt> that the describes
       * the error if anything goes wrong.
       */
      removeTrackAsMute(track: any): Promise<any>;
      /**
       * See {@link addTrackAsUnmute} and {@link removeTrackAsMute}.
       * @param {boolean} isMute <tt>true</tt> for "remove as mute" or
       * <tt>false</tt> for "add as unmute".
       * @param {JitsiLocalTrack} track the track that will be added/removed
       * @private
       */
      private _addRemoveTrackAsMuteUnmute;
      /**
       * Resumes or suspends media transfer over the underlying peer connection.
       * @param {boolean} audioActive <tt>true</tt> to enable audio media
       * transfer or <tt>false</tt> to suspend audio media transmission.
       * @param {boolean} videoActive <tt>true</tt> to enable video media
       * transfer or <tt>false</tt> to suspend video media transmission.
       * @return {Promise} a <tt>Promise</tt> which will resolve once
       * the operation is done. It will be rejected with an error description as
       * a string in case anything goes wrong.
       */
      setMediaTransferActive(audioActive: boolean, videoActive: boolean): Promise<any>;
      /**
       * Will put and execute on the queue a session modify task. Currently it
       * only checks the senders attribute of the video content in order to figure
       * out if the remote peer has video in the inactive state (stored locally
       * in {@link _remoteVideoActive} - see field description for more info).
       * @param {jQuery} jingleContents jQuery selector pointing to the jingle
       * element of the session modify IQ.
       * @see {@link _remoteVideoActive}
       * @see {@link _localVideoActive}
       */
      modifyContents(jingleContents: any): void;
      /**
       * Processes new value of remote video "senders" Jingle attribute and tries
       * to apply it for {@link _remoteVideoActive}.
       * @param {string} remoteVideoSenders the value of "senders" attribute of
       * Jingle video content element advertised by remote peer.
       * @return {boolean} <tt>true</tt> if the change affected state of
       * the underlying peerconnection and renegotiation is required for
       * the changes to take effect.
       * @private
       */
      private _modifyRemoteVideoActive;
      /**
       * Figures out added/removed ssrcs and send update IQs.
       * @param oldSDP SDP object for old description.
       * @param newSDP SDP object for new description.
       */
      notifyMySSRCUpdate(oldSDP: any, newSDP: any): void;
      /**
       * Method returns function(errorResponse) which is a callback to be passed
       * to Strophe connection.sendIQ method. An 'error' structure is created that
       * is passed as 1st argument to given <tt>failureCb</tt>. The format of this
       * structure is as follows:
       * {
       *  code: {XMPP error response code}
       *  reason: {the name of XMPP error reason element or 'timeout' if the
        *          request has timed out within <tt>IQ_TIMEOUT</tt> milliseconds}
       *  source: {request.tree() that provides original request}
       *  session: {this JingleSessionPC.toString()}
       * }
       * @param request Strophe IQ instance which is the request to be dumped into
       *        the error structure
       * @param failureCb function(error) called when error response was returned
       *        or when a timeout has occurred.
       * @returns {function(this:JingleSessionPC)}
       */
      newJingleErrorHandler(request: any, failureCb: any): (this: JingleSessionPC) => any;
      /**
       * Returns the ice connection state for the peer connection.
       * @returns the ice connection state for the peer connection.
       */
      getIceConnectionState(): any;
      /**
       * Closes the peerconnection.
       */
      close(): void;
      /**
       * If the A/B test for suspend video is disabled according to the room's
       * configuration, returns undefined. Otherwise returns a boolean which
       * indicates whether the suspend video option should be enabled or disabled.
       * @param {JingleSessionPCOptions} options - The config options.
       */
      _abtestSuspendVideoEnabled({ abTesting }: JingleSessionPCOptions): boolean;
  }
  export type JingleSessionPCOptions = {
      /**
       * - A/B testing related options (ask George).
       */
      abTesting: {
          enableSuspendVideoTest: boolean;
      };
      /**
       * - Described in the config.js[1].
       */
      disableH264: boolean;
      /**
       * - Described in the config.js[1].
       */
      disableRtx: boolean;
      /**
       * - Described in the config.js[1].
       */
      disableSimulcast: boolean;
      /**
       * - Set to true when the insertable streams constraints is to be enabled
       * on the PeerConnection.
       */
      enableInsertableStreams: boolean;
      /**
       * - Described in the config.js[1].
       */
      enableLayerSuspension: boolean;
      /**
       * - it's an option used in the tests. Set to
       * <tt>true</tt> to block any real candidates and make the ICE fail.
       */
      failICE: boolean;
      /**
       * - Described in the config.js[1].
       */
      gatherStats: boolean;
      /**
       * - Peer to peer related options (FIXME those could be
       * fetched from config.p2p on the upper level).
       */
      p2p: {
          disableH264: boolean;
          preferH264: boolean;
      };
      /**
       * - Described in the config.js[1].
       */
      preferH264: boolean;
      /**
       * - Testing and/or experimental options.
       */
      testing: any;
      /**
       * - Described in the config.js[1].
       */
      webrtcIceUdpDisable: boolean;
      /**
       * - Described in the config.js[1].
       *
       * [1]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
       */
      webrtcIceTcpDisable: boolean;
  };
  import JingleSession from "@lyno/lib-jitsi-meet/modules/xmpp/JingleSession";
  import SignalingLayerImpl from "@lyno/lib-jitsi-meet/modules/xmpp/SignalingLayerImpl";
  import AsyncQueue from "@lyno/lib-jitsi-meet/modules/util/AsyncQueue";
  import SDP from "@lyno/lib-jitsi-meet/modules/xmpp/SDP";
  import XmppConnection from "@lyno/lib-jitsi-meet/modules/xmpp/XmppConnection";

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/JingleSessionState' {
  /**
   * The pending Jingle session state which means the session as defined in
   * XEP-0166(before 'session-invite/session-accept' took place).
   *
   * @type {string}
   */
  export const PENDING: string;
  /**
   * The active Jingle session state as defined in XEP-0166
   * (after 'session-invite'/'session-accept').
   *
   * @type {string}
   */
  export const ACTIVE: string;
  /**
   * The ended Jingle session state as defined in XEP-0166
   * (after 'session-terminate').
   * @type {string}
   */
  export const ENDED: string;

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/Lobby' {
  /**
   * The Lobby room implementation. Setting a room to members only, joining the lobby room
   * approving or denying access to participants from the lobby room.
   */
  export default class Lobby {
      /**
       * Constructs lobby room.
       *
       * @param {ChatRoom} room the main room.
       */
      constructor(room: any);
      xmpp: any;
      mainRoom: any;
      lobbyRoomJid: any;
      /**
       * Whether lobby is supported on backend.
       *
       * @returns {boolean} whether lobby is supported on backend.
       */
      isSupported(): boolean;
      /**
       * Enables lobby by setting the main room to be members only and joins the lobby chat room.
       *
       * @returns {Promise}
       */
      enable(): Promise<any>;
      /**
       * Disable lobby by setting the main room to be non members only and levaes the lobby chat room if joined.
       *
       * @returns {void}
       */
      disable(): void;
      /**
       * Leaves the lobby room.
       * @private
       */
      private _leaveLobbyRoom;
      lobbyRoom: any;
      /**
       * We had received a jid for the lobby room.
       *
       * @param jid the lobby room jid to join.
       */
      setLobbyRoomJid(jid: any): void;
      /**
       * Checks the state of mainRoom, lobbyRoom and current user role to decide whether to join lobby room.
       * @private
       */
      private _maybeJoinLobbyRoom;
      /**
       * Joins a lobby room setting display name and eventually avatar(using the email provided).
       *
       * @param {string} username is required.
       * @param {string} email is optional.
       * @returns {Promise} resolves once we join the room.
       */
      join(displayName: any, email: string): Promise<any>;
      /**
       * Should be possible only for moderators.
       * @param id
       */
      denyAccess(id: any): void;
      /**
       * Should be possible only for moderators.
       * @param id
       */
      approveAccess(id: any): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/MediaSessionEvents' {
  namespace _default {
      const REMOTE_VIDEO_CONSTRAINTS_CHANGED: string;
  }
  export default _default;

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/MockClasses' {
  /**
   * Mock {@link ChatRoom}.
   */
  export class MockChatRoom {
      /**
       * {@link ChatRoom.addPresenceListener}.
       */
      addPresenceListener(): void;
  }
  /**
   * Mock Strophe connection.
   */
  export class MockStropheConnection extends Listenable {
      /**
       * A constructor...
       */
      constructor();
      sentIQs: any[];
      _proto: {
          socket: any;
      };
      /**
       * XMPP service URL.
       *
       * @returns {string}
       */
      get service(): string;
      /**
       * {@see Strophe.Connection.connect}
       */
      connect(jid: any, pass: any, callback: any): void;
      _connectCb: any;
      /**
       * {@see Strophe.Connection.disconnect}
       */
      disconnect(): void;
      /**
       * Simulates transition to the new connection status.
       *
       * @param {Strophe.Status} newState - The new connection status to set.
       * @returns {void}
       */
      simulateConnectionState(newState: any): void;
      /**
       * {@see Strophe.Connection.sendIQ}.
       */
      sendIQ(iq: any, resultCb: any): void;
  }
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/ResumeTask' {
  /**
   * The class contains the logic for triggering connection resume via XEP-0198 stream management.
   * It does two things, the first one is it tracks the internet online/offline status and it makes sure that
   * the reconnect is attempted only while online. The seconds thing is that it tracks the retry attempts and extends
   * the retry interval using the full jitter pattern.
   */
  export default class ResumeTask {
      /**
       * Initializes new {@code RetryTask}.
       * @param {Strophe.Connection} stropheConnection - The Strophe connection instance.
       */
      constructor(stropheConnection: any);
      _stropheConn: any;
      /**
       * The counter increased before each resume retry attempt, used to calculate exponential backoff.
       * @type {number}
       * @private
       */
      private _resumeRetryN;
      _retryDelay: number;
      /**
       * @returns {number|undefined} - How much the app will wait before trying to resume the XMPP connection. When
       * 'undefined' it means that no resume task was not scheduled.
       */
      get retryDelay(): number;
      /**
       * Called by {@link XmppConnection} when the connection drops and it's a signal it wants to schedule a reconnect.
       *
       * @returns {void}
       */
      schedule(): void;
      _networkOnlineListener: Function;
      /**
       * Schedules a delayed timeout which will execute the resume action.
       * @private
       * @returns {void}
       */
      private _scheduleResume;
      _resumeTimeout: NodeJS.Timeout;
      /**
       * Cancels the delayed resume task.
       *
       * @private
       * @returns {void}
       */
      private _cancelResume;
      /**
       * Resumes the XMPP connection using the stream management plugin.
       *
       * @private
       * @returns {void}
       */
      private _resumeConnection;
      /**
       * Cancels the retry task. It's called by {@link XmppConnection} when it's no longer interested in reconnecting for
       * example when the disconnect method is called.
       *
       * @returns {void}
       */
      cancel(): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/RtxModifier' {
  /**
   * End helper functions
   */
  /**
   * Adds any missing RTX streams for video streams
   *  and makes sure that they remain consistent
   */
  export default class RtxModifier {
      /**
       * Map of video ssrc to corresponding RTX
       *  ssrc
       */
      correspondingRtxSsrcs: Map<any, any>;
      /**
       * Clear the cached map of primary video ssrcs to
       *  their corresponding rtx ssrcs so that they will
       *  not be used for the next call to modifyRtxSsrcs
       */
      clearSsrcCache(): void;
      /**
       * Explicitly set the primary video ssrc -> rtx ssrc
       *  mapping to be used in modifyRtxSsrcs
       * @param {Map} ssrcMapping a mapping of primary video
       *  ssrcs to their corresponding rtx ssrcs
       */
      setSsrcCache(ssrcMapping: Map<any, any>): void;
      /**
       * Adds RTX ssrcs for any video ssrcs that don't
       *  already have them.  If the video ssrc has been
       *  seen before, and already had an RTX ssrc generated,
       *  the same RTX ssrc will be used again.
       * @param {string} sdpStr sdp in raw string format
       */
      modifyRtxSsrcs(sdpStr: string): string;
      /**
       * Does the same thing as {@link modifyRtxSsrcs}, but takes the
       *  {@link MLineWrap} instance wrapping video media as an argument.
       * @param {MLineWrap} videoMLine
       * @return {boolean} <tt>true</tt> if the SDP wrapped by
       *  {@link SdpTransformWrap} has been modified or <tt>false</tt> otherwise.
       */
      modifyRtxSsrcs2(videoMLine: any): boolean;
      /**
       * Strip all rtx streams from the given sdp
       * @param {string} sdpStr sdp in raw string format
       * @returns {string} sdp string with all rtx streams stripped
       */
      stripRtx(sdpStr: string): string;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/SDP' {
  /**
   *
   * @param sdp
   */
  export default function SDP(sdp: any): void;
  export default class SDP {
      /**
       *
       * @param sdp
       */
      constructor(sdp: any);
      media: any;
      raw: string;
      session: string;
      /**
       * A flag will make {@link transportToJingle} and {@link jingle2media} replace
       * ICE candidates IPs with invalid value of '1.1.1.1' which will cause ICE
       * failure. The flag is used in the automated testing.
       * @type {boolean}
       */
      failICE: boolean;
      /**
       * Whether or not to remove TCP ice candidates when translating from/to jingle.
       * @type {boolean}
       */
      removeTcpCandidates: boolean;
      /**
       * Whether or not to remove UDP ice candidates when translating from/to jingle.
       * @type {boolean}
       */
      removeUdpCandidates: boolean;
      getMediaSsrcMap(): {};
      containsSSRC(ssrc: any): boolean;
      toJingle(elem: any, thecreator: any): any;
      transportToJingle(mediaindex: any, elem: any): void;
      rtcpFbToJingle(mediaindex: any, elem: any, payloadtype: any): void;
      rtcpFbFromJingle(elem: any, payloadtype: any): string;
      fromJingle(jingle: any): void;
      jingle2media(content: any): string;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/SDPDiffer' {
  /**
   *
   * @param mySDP
   * @param otherSDP
   */
  export default function SDPDiffer(mySDP: any, otherSDP: any): void;
  export default class SDPDiffer {
      /**
       *
       * @param mySDP
       * @param otherSDP
       */
      constructor(mySDP: any, otherSDP: any);
      mySDP: any;
      otherSDP: any;
      getNewMedia(): {};
      toJingle(modify: any): boolean;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/SDPUtil' {
  export default SDPUtil;
  namespace SDPUtil {
      function filterSpecialChars(text: any): any;
      function filterSpecialChars(text: any): any;
      function iceparams(mediadesc: any, sessiondesc: any): {
          ufrag: any;
          pwd: any;
      };
      function iceparams(mediadesc: any, sessiondesc: any): {
          ufrag: any;
          pwd: any;
      };
      function parseICEUfrag(line: any): any;
      function parseICEUfrag(line: any): any;
      function buildICEUfrag(frag: any): `a=ice-ufrag:${any}`;
      function buildICEUfrag(frag: any): `a=ice-ufrag:${any}`;
      function parseICEPwd(line: any): any;
      function parseICEPwd(line: any): any;
      function buildICEPwd(pwd: any): `a=ice-pwd:${any}`;
      function buildICEPwd(pwd: any): `a=ice-pwd:${any}`;
      function parseMID(line: any): any;
      function parseMID(line: any): any;
      function parseMLine(line: any): {
          media: any;
          port: any;
          proto: any;
          fmt: any;
      };
      function parseMLine(line: any): {
          media: any;
          port: any;
          proto: any;
          fmt: any;
      };
      function buildMLine(mline: any): `m=${any} ${any} ${any} ${any}`;
      function buildMLine(mline: any): `m=${any} ${any} ${any} ${any}`;
      function parseRTPMap(line: any): {
          id: any;
          name: any;
          clockrate: any;
          channels: any;
      };
      function parseRTPMap(line: any): {
          id: any;
          name: any;
          clockrate: any;
          channels: any;
      };
      /**
       * Parses SDP line "a=sctpmap:..." and extracts SCTP port from it.
       * @param line eg. "a=sctpmap:5000 webrtc-datachannel"
       * @returns [SCTP port number, protocol, streams]
       */
      function parseSCTPMap(line: any): any[];
      /**
       * Parses SDP line "a=sctpmap:..." and extracts SCTP port from it.
       * @param line eg. "a=sctpmap:5000 webrtc-datachannel"
       * @returns [SCTP port number, protocol, streams]
       */
      function parseSCTPMap(line: any): any[];
      function buildRTPMap(el: any): string;
      function buildRTPMap(el: any): string;
      function parseCrypto(line: any): {
          tag: any;
          'crypto-suite': any;
          'key-params': any;
          'session-params': any;
      };
      function parseCrypto(line: any): {
          tag: any;
          'crypto-suite': any;
          'key-params': any;
          'session-params': any;
      };
      function parseFingerprint(line: any): {
          hash: any;
          fingerprint: any;
      };
      function parseFingerprint(line: any): {
          hash: any;
          fingerprint: any;
      };
      function parseFmtp(line: any): {
          name: any;
          value: any;
      }[];
      function parseFmtp(line: any): {
          name: any;
          value: any;
      }[];
      function parseICECandidate(line: any): {
          foundation: any;
          component: any;
          protocol: any;
          priority: any;
          ip: any;
          port: any;
          type: any;
          generation: any;
          'rel-addr': any;
          'rel-port': any;
          tcptype: any;
          network: string;
          id: string;
      };
      function parseICECandidate(line: any): {
          foundation: any;
          component: any;
          protocol: any;
          priority: any;
          ip: any;
          port: any;
          type: any;
          generation: any;
          'rel-addr': any;
          'rel-port': any;
          tcptype: any;
          network: string;
          id: string;
      };
      function buildICECandidate(cand: any): string;
      function buildICECandidate(cand: any): string;
      function parseSSRC(desc: any): Map<any, any>;
      function parseSSRC(desc: any): Map<any, any>;
      function parseRTCPFB(line: any): {
          pt: any;
          type: any;
          params: any;
      };
      function parseRTCPFB(line: any): {
          pt: any;
          type: any;
          params: any;
      };
      function parseExtmap(line: any): {
          value: any;
          direction: any;
          uri: any;
          params: any;
      };
      function parseExtmap(line: any): {
          value: any;
          direction: any;
          uri: any;
          params: any;
      };
      function findLine(haystack: any, needle: any, sessionpart: any): any;
      function findLine(haystack: any, needle: any, sessionpart: any): any;
      function findLines(haystack: any, needle: any, sessionpart: any): any[];
      function findLines(haystack: any, needle: any, sessionpart: any): any[];
      function candidateToJingle(line: any): {
          foundation: any;
          component: any;
          protocol: any;
          priority: any;
          ip: any;
          port: any;
          type: any;
          generation: any;
          'rel-addr': any;
          'rel-port': any;
          tcptype: any;
          network: string;
          id: string;
      };
      function candidateToJingle(line: any): {
          foundation: any;
          component: any;
          protocol: any;
          priority: any;
          ip: any;
          port: any;
          type: any;
          generation: any;
          'rel-addr': any;
          'rel-port': any;
          tcptype: any;
          network: string;
          id: string;
      };
      function candidateFromJingle(cand: any): `${string}
  `;
      function candidateFromJingle(cand: any): `${string}
  `;
      /**
       * Parse the 'most' primary video ssrc from the given m line
       * @param {object} mLine object as parsed from transform.parse
       * @return {number} the primary video ssrc from the given m line
       */
      function parsePrimaryVideoSsrc(videoMLine: any): number;
      /**
       * Parse the 'most' primary video ssrc from the given m line
       * @param {object} mLine object as parsed from transform.parse
       * @return {number} the primary video ssrc from the given m line
       */
      function parsePrimaryVideoSsrc(videoMLine: any): number;
      /**
       * Generate an ssrc
       * @returns {number} an ssrc
       */
      function generateSsrc(): number;
      /**
       * Generate an ssrc
       * @returns {number} an ssrc
       */
      function generateSsrc(): number;
      /**
       * Get an attribute for the given ssrc with the given attributeName
       *  from the given mline
       * @param {object} mLine an mLine object as parsed from transform.parse
       * @param {number} ssrc the ssrc for which an attribute is desired
       * @param {string} attributeName the name of the desired attribute
       * @returns {string} the value corresponding to the given ssrc
       *  and attributeName
       */
      function getSsrcAttribute(mLine: any, ssrc: number, attributeName: string): string;
      /**
       * Get an attribute for the given ssrc with the given attributeName
       *  from the given mline
       * @param {object} mLine an mLine object as parsed from transform.parse
       * @param {number} ssrc the ssrc for which an attribute is desired
       * @param {string} attributeName the name of the desired attribute
       * @returns {string} the value corresponding to the given ssrc
       *  and attributeName
       */
      function getSsrcAttribute(mLine: any, ssrc: number, attributeName: string): string;
      /**
       * Parses the ssrcs from the group sdp line and
       *  returns them as a list of numbers
       * @param {object} the ssrcGroup object as parsed from
       *  sdp-transform
       * @returns {list<number>} a list of the ssrcs in the group
       *  parsed as numbers
       */
      function parseGroupSsrcs(ssrcGroup: any): any;
      /**
       * Parses the ssrcs from the group sdp line and
       *  returns them as a list of numbers
       * @param {object} the ssrcGroup object as parsed from
       *  sdp-transform
       * @returns {list<number>} a list of the ssrcs in the group
       *  parsed as numbers
       */
      function parseGroupSsrcs(ssrcGroup: any): any;
      /**
       * Get the mline of the given type from the given sdp
       * @param {object} sdp sdp as parsed from transform.parse
       * @param {string} type the type of the desired mline (e.g. "video")
       * @returns {object} a media object
       */
      function getMedia(sdp: any, type: string): any;
      /**
       * Get the mline of the given type from the given sdp
       * @param {object} sdp sdp as parsed from transform.parse
       * @param {string} type the type of the desired mline (e.g. "video")
       * @returns {object} a media object
       */
      function getMedia(sdp: any, type: string): any;
      /**
       * Extracts the ICE username fragment from an SDP string.
       * @param {string} sdp the SDP in raw text format
       */
      function getUfrag(sdp: string): string;
      /**
       * Extracts the ICE username fragment from an SDP string.
       * @param {string} sdp the SDP in raw text format
       */
      function getUfrag(sdp: string): string;
      /**
       * Sets the given codecName as the preferred codec by moving it to the beginning
       * of the payload types list (modifies the given mline in place). All instances
       * of the codec are moved up.
       * @param {object} mLine the mline object from an sdp as parsed by transform.parse
       * @param {string} codecName the name of the preferred codec
       */
      function preferCodec(mline: any, codecName: string): void;
      /**
       * Sets the given codecName as the preferred codec by moving it to the beginning
       * of the payload types list (modifies the given mline in place). All instances
       * of the codec are moved up.
       * @param {object} mLine the mline object from an sdp as parsed by transform.parse
       * @param {string} codecName the name of the preferred codec
       */
      function preferCodec(mline: any, codecName: string): void;
      /**
       * Strips the given codec from the given mline. All related RTX payload
       * types are also stripped. If the resulting mline would have no codecs,
       * it's disabled.
       *
       * @param {object} mLine the mline object from an sdp as parsed by transform.parse.
       * @param {string} codecName the name of the codec which will be stripped.
       * @param {boolean} highProfile determines if only the high profile H264 codec needs to be
       * stripped from the sdp when the passed codecName is H264.
       */
      function stripCodec(mLine: any, codecName: string, highProfile?: boolean): void;
      /**
       * Strips the given codec from the given mline. All related RTX payload
       * types are also stripped. If the resulting mline would have no codecs,
       * it's disabled.
       *
       * @param {object} mLine the mline object from an sdp as parsed by transform.parse.
       * @param {string} codecName the name of the codec which will be stripped.
       * @param {boolean} highProfile determines if only the high profile H264 codec needs to be
       * stripped from the sdp when the passed codecName is H264.
       */
      function stripCodec(mLine: any, codecName: string, highProfile?: boolean): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/SampleSdpStrings' {
  namespace _default { }
  export default _default;

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/SdpConsistency' {
  /**
   * Handles the work of keeping video ssrcs consistent across multiple
   * o/a cycles, making it such that all stream operations can be
   * kept local and do not need to be signaled.
   * NOTE: This only keeps the 'primary' video ssrc consistent: meaning
   * the primary video stream
   */
  export default class SdpConsistency {
      /**
       * Constructor
       * @param {string} logPrefix the log prefix appended to every logged
       * message, currently used to distinguish for which
       * <tt>TraceablePeerConnection</tt> the instance works.
       */
      constructor(logPrefix: string);
      logPrefix: string;
      /**
       * Clear the cached video primary and primary rtx ssrcs so that
       *  they will not be used for the next call to
       *  makeVideoPrimarySsrcsConsistent
       */
      clearVideoSsrcCache(): void;
      cachedPrimarySsrc: number;
      injectRecvOnly: boolean;
      /**
       * Explicitly set the primary ssrc to be used in
       *  makeVideoPrimarySsrcsConsistent
       * @param {number} primarySsrc the primarySsrc to be used
       *  in future calls to makeVideoPrimarySsrcsConsistent
       * @throws Error if <tt>primarySsrc</tt> is not a number
       */
      setPrimarySsrc(primarySsrc: number): void;
      /**
       * Checks whether or not there is a primary video SSRC cached already.
       * @return {boolean}
       */
      hasPrimarySsrcCached(): boolean;
      /**
       * Given an sdp string, either:
       *  1) record the primary video and primary rtx ssrcs to be
       *   used in future calls to makeVideoPrimarySsrcsConsistent or
       *  2) change the primary and primary rtx ssrcs in the given sdp
       *   to match the ones previously cached
       * @param {string} sdpStr the sdp string to (potentially)
       *  change to make the video ssrcs consistent
       * @returns {string} a (potentially) modified sdp string
       *  with ssrcs consistent with this class' cache
       */
      makeVideoPrimarySsrcsConsistent(sdpStr: string): string;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/SdpTransformUtil' {
  /**
   * Parses the primary SSRC of given SSRC group.
   * @param {object} group the SSRC group object as defined by the 'sdp-transform'
   * @return {Number} the primary SSRC number
   */
  export function parsePrimarySSRC(group: object): number;
  /**
   * Parses the secondary SSRC of given SSRC group.
   * @param {object} group the SSRC group object as defined by the 'sdp-transform'
   * @return {Number} the secondary SSRC number
   */
  export function parseSecondarySSRC(group: object): number;
  /**
   * Utility class for SDP manipulation using the 'sdp-transform' library.
   *
   * Typical use usage scenario:
   *
   * const transformer = new SdpTransformWrap(rawSdp);
   * const videoMLine = transformer.selectMedia('video);
   * if (videoMLine) {
   *     videoMLiner.addSSRCAttribute({
   *         id: 2342343,
   *         attribute: "cname",
   *         value: "someCname"
   *     });
   *     rawSdp = transformer.toRawSdp();
   * }
   */
  export class SdpTransformWrap {
      /**
       * Creates new instance and parses the raw SDP into objects using
       * 'sdp-transform' lib.
       * @param {string} rawSDP the SDP in raw text format.
       */
      constructor(rawSDP: string);
      parsedSDP: any;
      /**
       * Selects the first media SDP of given name.
       * @param {string} mediaType the name of the media e.g. 'audio', 'video',
       * 'data'.
       * @return {MLineWrap|null} return {@link MLineWrap} instance for the media
       * line or <tt>null</tt> if not found. The object returned references
       * the underlying SDP state held by this <tt>SdpTransformWrap</tt> instance
       * (it's not a copy).
       */
      selectMedia(mediaType: string): MLineWrap | null;
      /**
       * Converts the currently stored SDP state in this instance to raw text SDP
       * format.
       * @return {string}
       */
      toRawSDP(): string;
  }
  /**
   * A wrapper around 'sdp-transform' media description object which provides
   * utility methods for common SDP/SSRC related operations.
   */
  class MLineWrap {
      /**
       * Creates new <tt>MLineWrap</t>>
       * @param {Object} mLine the media line object as defined by 'sdp-transform'
       * lib.
       */
      constructor(mLine: any);
      mLine: any;
      /**
       * Setter for the mLine's "ssrcs" array.
       *
       * @param {Array<Object>} ssrcs an array of 'sdp-transform' SSRC attributes
       * objects.
       */
      set ssrcs(arg: any[]);
      /**
       * Getter for the mLine's "ssrcs" array. If the array was undefined an empty
       * one will be preassigned.
       *
       * @return {Array<Object>} an array of 'sdp-transform' SSRC attributes
       * objects.
       */
      get ssrcs(): any[];
      /**
       * Modifies the direction of the underlying media description.
       * @param {string} direction the new direction to be set
       */
      set direction(arg: string);
      /**
       * Returns the direction of the underlying media description.
       * @return {string} the media direction name as defined in the SDP.
       */
      get direction(): string;
      /**
       * Modifies the SSRC groups array of the underlying media description
       * object.
       * @param {Array.<Object>} ssrcGroups
       */
      set ssrcGroups(arg: any[]);
      /**
       * Exposes the SSRC group array of the underlying media description object.
       * @return {Array.<Object>}
       */
      get ssrcGroups(): any[];
      /**
       * Obtains value from SSRC attribute.
       * @param {number} ssrcNumber the SSRC number for which attribute is to be
       * found
       * @param {string} attrName the name of the SSRC attribute to be found.
       * @return {string|undefined} the value of SSRC attribute or
       * <tt>undefined</tt> if no such attribute exists.
       */
      getSSRCAttrValue(ssrcNumber: number, attrName: string): string | undefined;
      /**
       * Removes all attributes for given SSRC number.
       * @param {number} ssrcNum the SSRC number for which all attributes will be
       * removed.
       */
      removeSSRC(ssrcNum: number): void;
      /**
       * Adds SSRC attribute
       * @param {object} ssrcObj the SSRC attribute object as defined in
       * the 'sdp-transform' lib.
       */
      addSSRCAttribute(ssrcObj: object): void;
      /**
       * Finds a SSRC group matching both semantics and SSRCs in order.
       * @param {string} semantics the name of the semantics
       * @param {string} [ssrcs] group SSRCs as a string (like it's defined in
       * SSRC group object of the 'sdp-transform' lib) e.g. "1232546 342344 25434"
       * @return {object|undefined} the SSRC group object or <tt>undefined</tt> if
       * not found.
       */
      findGroup(semantics: string, ssrcs?: string): object | undefined;
      /**
       * Finds all groups matching given semantic's name.
       * @param {string} semantics the name of the semantics
       * @return {Array.<object>} an array of SSRC group objects as defined by
       * the 'sdp-transform' lib.
       */
      findGroups(semantics: string): Array<object>;
      /**
       * Finds all groups matching given semantic's name and group's primary SSRC.
       * @param {string} semantics the name of the semantics
       * @param {number} primarySSRC the primary SSRC number to be matched
       * @return {Object} SSRC group object as defined by the 'sdp-transform' lib.
       */
      findGroupByPrimarySSRC(semantics: string, primarySSRC: number): any;
      /**
       * @param {string|null} msid the media stream id or <tt>null</tt> to match
       * the first SSRC object with any 'msid' value.
       * @return {Object|undefined} the SSRC object as defined by 'sdp-transform'
       * lib.
       */
      findSSRCByMSID(msid: string | null): any | undefined;
      /**
       * Gets the SSRC count for the underlying media description.
       * @return {number}
       */
      getSSRCCount(): number;
      /**
       * Checks whether the underlying media description contains any SSRC groups.
       * @return {boolean} <tt>true</tt> if there are any SSRC groups or
       * <tt>false</tt> otherwise.
       */
      containsAnySSRCGroups(): boolean;
      /**
       * Finds the primary video SSRC.
       * @returns {number|undefined} the primary video ssrc
       * @throws Error if the underlying media description is not a video
       */
      getPrimaryVideoSsrc(): number | undefined;
      /**
       * Obtains RTX SSRC from the underlying video description (the
       * secondary SSRC of the first "FID" group found)
       * @param {number} primarySsrc the video ssrc for which to find the
       * corresponding rtx ssrc
       * @returns {number|undefined} the rtx ssrc (or undefined if there isn't
       * one)
       */
      getRtxSSRC(primarySsrc: number): number | undefined;
      /**
       * Obtains all SSRCs contained in the underlying media description.
       * @return {Array.<number>} an array with all SSRC as numbers.
       */
      getSSRCs(): Array<number>;
      /**
       * Obtains primary video SSRCs.
       * @return {Array.<number>} an array of all primary video SSRCs as numbers.
       * @throws Error if the wrapped media description is not a video.
       */
      getPrimaryVideoSSRCs(): Array<number>;
      /**
       * Dumps all SSRC groups of this media description to JSON.
       */
      dumpSSRCGroups(): string;
      /**
       * Removes all SSRC groups which contain given SSRC number at any position.
       * @param {number} ssrc the SSRC for which all matching groups are to be
       * removed.
       */
      removeGroupsWithSSRC(ssrc: number): void;
      /**
       * Removes groups that match given semantics.
       * @param {string} semantics e.g. "SIM" or "FID"
       */
      removeGroupsBySemantics(semantics: string): void;
      /**
       * Replaces SSRC (does not affect SSRC groups, but only attributes).
       * @param {number} oldSSRC the old SSRC number
       * @param {number} newSSRC the new SSRC number
       */
      replaceSSRC(oldSSRC: number, newSSRC: number): void;
      /**
       * Adds given SSRC group to this media description.
       * @param {object} group the SSRC group object as defined by
       * the 'sdp-transform' lib.
       */
      addSSRCGroup(group: object): void;
  }
  export {};

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/SignalingLayerImpl' {
  /**
   * Default XMPP implementation of the {@link SignalingLayer} interface. Obtains
   * the data from the MUC presence.
   */
  export default class SignalingLayerImpl extends SignalingLayer {
      /**
       * Creates new instance.
       */
      constructor();
      /**
       * A map that stores SSRCs of remote streams. And is used only locally
       * We store the mapping when jingle is received, and later is used
       * onaddstream webrtc event where we have only the ssrc
       * FIXME: This map got filled and never cleaned and can grow during long
       * conference
       * @type {Map<number, string>} maps SSRC number to jid
       */
      ssrcOwners: Map<number, string>;
      /**
       *
       * @type {ChatRoom|null}
       */
      chatRoom: any | null;
      /**
       * Sets the <tt>ChatRoom</tt> instance used and binds presence listeners.
       * @param {ChatRoom} room
       */
      setChatRoom(room: any): void;
      _audioMuteHandler: (node: any, from: any) => void;
      _videoMuteHandler: (node: any, from: any) => void;
      _videoTypeHandler: (node: any, from: any) => void;
      /**
       * Set an SSRC owner.
       * @param {number} ssrc an SSRC to be owned
       * @param {string} endpointId owner's ID (MUC nickname)
       * @throws TypeError if <tt>ssrc</tt> is not a number
       */
      setSSRCOwner(ssrc: number, endpointId: string): void;
  }
  import SignalingLayer from "@lyno/lib-jitsi-meet/service/RTC/SignalingLayer";

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/StropheLastSuccess' {
  /**
   * Attaches to the {@link Strophe.Connection.rawInput} which is called whenever any data is received from the server.
   */
  export default class LastRequestTracker {
      _lastSuccess: number;
      /**
       * Starts tracking requests on the given connection.
       *
       * @param {XmppConnection} xmppConnection - The XMPP connection which manages the given {@code stropheConnection}.
       * @param {Object} stropheConnection - Strophe connection instance.
       */
      startTracking(xmppConnection: any, stropheConnection: any): void;
      /**
       * Returns how many milliseconds have passed since the last successful BOSH request.
       *
       * @returns {number|null}
       */
      getTimeSinceLastSuccess(): number | null;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/XmppConnection' {
  /**
   * The lib-jitsi-meet layer for {@link Strophe.Connection}.
   */
  export default class XmppConnection extends Listenable {
      /**
       * The list of {@link XmppConnection} events.
       *
       * @returns {Object}
       */
      static get Events(): any;
      /**
       * The list of Xmpp connection statuses.
       *
       * @returns {Strophe.Status}
       */
      static get Status(): any;
      /**
       * Initializes new connection instance.
       *
       * @param {Object} options
       * @param {String} options.serviceUrl - The BOSH or WebSocket service URL.
       * @param {String} [options.enableWebsocketResume=true] - True/false to control the stream resumption functionality.
       * It will enable automatically by default if supported by the XMPP server.
       * @param {Number} [options.websocketKeepAlive=240000] - The websocket keep alive interval. It's 4 minutes by
       * default with jitter. Pass -1 to disable. The actual interval equation is:
       * jitterDelay = (interval * 0.2) + (0.8 * interval * Math.random())
       * The keep alive is HTTP GET request to the {@link options.serviceUrl}.
       * @param {Object} [options.xmppPing] - The xmpp ping settings.
       */
      constructor({ enableWebsocketResume, websocketKeepAlive, serviceUrl, xmppPing }: {
          serviceUrl: string;
          enableWebsocketResume?: string;
          websocketKeepAlive?: number;
          xmppPing?: any;
      });
      _options: {
          enableWebsocketResume: string | boolean;
          pingOptions: any;
          websocketKeepAlive: number;
      };
      _stropheConn: any;
      _usesWebsocket: boolean;
      _lastSuccessTracker: LastSuccessTracker;
      _resumeTask: ResumeTask;
      /**
       * @typedef DeferredSendIQ Object
       * @property {Element} iq - The IQ to send.
       * @property {function} resolve - The resolve method of the deferred Promise.
       * @property {function} reject - The reject method of the deferred Promise.
       * @property {number} timeout - The ID of the timeout task that needs to be cleared, before sending the IQ.
       */
      /**
       * Deferred IQs to be sent upon reconnect.
       * @type {Array<DeferredSendIQ>}
       * @private
       */
      private _deferredIQs;
      /**
       * A getter for the connected state.
       *
       * @returns {boolean}
       */
      get connected(): boolean;
      /**
       * Retrieves the feature discovery plugin instance.
       *
       * @returns {Strophe.Connection.disco}
       */
      get disco(): any;
      /**
       * A getter for the disconnecting state.
       *
       * @returns {boolean}
       */
      get disconnecting(): boolean;
      /**
       * A getter for the domain.
       *
       * @returns {string|null}
       */
      get domain(): string;
      /**
       * Tells if Websocket is used as the transport for the current XMPP connection. Returns true for Websocket or false
       * for BOSH.
       * @returns {boolean}
       */
      get isUsingWebSocket(): boolean;
      /**
       * A getter for the JID.
       *
       * @returns {string|null}
       */
      get jid(): string;
      /**
       * Returns headers for the last BOSH response received.
       *
       * @returns {string}
       */
      get lastResponseHeaders(): string;
      /**
       * A getter for the logger plugin instance.
       *
       * @returns {*}
       */
      get logger(): any;
      /**
       * A getter for the connection options.
       *
       * @returns {*}
       */
      get options(): any;
      /**
       * A getter for the domain to be used for ping.
       */
      get pingDomain(): any;
      /**
       * A getter for the service URL.
       *
       * @returns {string}
       */
      get service(): string;
      /**
       * Returns the current connection status.
       *
       * @returns {Strophe.Status}
       */
      get status(): any;
      /**
       * Adds a connection plugin to this instance.
       *
       * @param {string} name - The name of the plugin or rather a key under which it will be stored on this connection
       * instance.
       * @param {ConnectionPluginListenable} plugin - The plugin to add.
       */
      addConnectionPlugin(name: string, plugin: any): void;
      /**
       * See {@link Strophe.Connection.addHandler}
       *
       * @returns {void}
       */
      addHandler(...args: any[]): void;
      /**
       * Wraps {@link Strophe.Connection.attach} method in order to intercept the connection status updates.
       * See {@link Strophe.Connection.attach} for the params description.
       *
       * @returns {void}
       */
      attach(jid: any, sid: any, rid: any, callback: any, ...args: any[]): void;
      /**
       * Wraps Strophe.Connection.connect method in order to intercept the connection status updates.
       * See {@link Strophe.Connection.connect} for the params description.
       *
       * @returns {void}
       */
      connect(jid: any, pass: any, callback: any, ...args: any[]): void;
      /**
       * Handles {@link Strophe.Status} updates for the current connection.
       *
       * @param {function} targetCallback - The callback passed by the {@link XmppConnection} consumer to one of
       * the connect methods.
       * @param {Strophe.Status} status - The new connection status.
       * @param {*} args - The rest of the arguments passed by Strophe.
       * @private
       */
      private _stropheConnectionCb;
      _status: any;
      /**
       * Clears the list of IQs and rejects deferred Promises with an error.
       *
       * @private
       */
      private _clearDeferredIQs;
      /**
       * The method is meant to be used for testing. It's a shortcut for closing the WebSocket.
       *
       * @returns {void}
       */
      closeWebsocket(): void;
      /**
       * See {@link Strophe.Connection.disconnect}.
       *
       * @returns {void}
       */
      disconnect(...args: any[]): void;
      /**
       * See {@link Strophe.Connection.flush}.
       *
       * @returns {void}
       */
      flush(...args: any[]): void;
      /**
       * See {@link LastRequestTracker.getTimeSinceLastSuccess}.
       *
       * @returns {number|null}
       */
      getTimeSinceLastSuccess(): number | null;
      /**
       * Requests a resume token from the server if enabled and all requirements are met.
       *
       * @private
       */
      private _maybeEnableStreamResume;
      /**
       * Starts the Websocket keep alive if enabled.
       *
       * @private
       * @returns {void}
       */
      private _maybeStartWSKeepAlive;
      _wsKeepAlive: NodeJS.Timeout;
      /**
       * Goes over the list of {@link DeferredSendIQ} tasks and sends them.
       *
       * @private
       * @returns {void}
       */
      private _processDeferredIQs;
      /**
       * Send a stanza. This function is called to push data onto the send queue to go out over the wire.
       *
       * @param {Element|Strophe.Builder} stanza - The stanza to send.
       * @returns {void}
       */
      send(stanza: Element | any): void;
      /**
       * Helper function to send IQ stanzas.
       *
       * @param {Element} elem - The stanza to send.
       * @param {Function} callback - The callback function for a successful request.
       * @param {Function} errback - The callback function for a failed or timed out request.  On timeout, the stanza will
       * be null.
       * @param {number} timeout - The time specified in milliseconds for a timeout to occur.
       * @returns {number} - The id used to send the IQ.
       */
      sendIQ(elem: Element, callback: Function, errback: Function, timeout: number): number;
      /**
       * Sends an IQ immediately if connected or puts it on the send queue otherwise(in contrary to other send methods
       * which would fail immediately if disconnected).
       *
       * @param {Element} iq - The IQ to send.
       * @param {number} timeout - How long to wait for the response. The time when the connection is reconnecting is
       * included, which means that the IQ may never be sent and still fail with a timeout.
       */
      sendIQ2(iq: Element, { timeout }: number): Promise<any>;
      /**
       * Called by the ping plugin when ping fails too many times.
       *
       * @returns {void}
       */
      _onPingErrorThresholdExceeded(): void;
      /**
       *  Helper function to send presence stanzas. The main benefit is for sending presence stanzas for which you expect
       *  a responding presence stanza with the same id (for example when leaving a chat room).
       *
       * @param {Element} elem - The stanza to send.
       * @param {Function} callback - The callback function for a successful request.
       * @param {Function} errback - The callback function for a failed or timed out request. On timeout, the stanza will
       * be null.
       * @param {number} timeout - The time specified in milliseconds for a timeout to occur.
       * @returns {number} - The id used to send the presence.
       */
      sendPresence(elem: Element, callback: Function, errback: Function, timeout: number): number;
      /**
       * The method gracefully closes the BOSH connection by using 'navigator.sendBeacon'.
       *
       * @returns {boolean} - true if the beacon was sent.
       */
      sendUnavailableBeacon(): boolean;
      /**
       * Tries to use stream management plugin to resume dropped XMPP connection. The streamManagement plugin clears
       * the resume token if any connection error occurs which would put it in unrecoverable state, so as long as
       * the token is present it means the connection can be resumed.
       *
       * @private
       * @returns {boolean}
       */
      private _tryResumingConnection;
  }
  /**
   * Object
   */
  export type DeferredSendIQ = {
      /**
       * - The IQ to send.
       */
      iq: Element;
      /**
       * - The resolve method of the deferred Promise.
       */
      resolve: Function;
      /**
       * - The reject method of the deferred Promise.
       */
      reject: Function;
      /**
       * - The ID of the timeout task that needs to be cleared, before sending the IQ.
       */
      timeout: number;
  };
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";
  import LastSuccessTracker from "@lyno/lib-jitsi-meet/modules/xmpp/StropheLastSuccess";
  import ResumeTask from "@lyno/lib-jitsi-meet/modules/xmpp/ResumeTask";

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/moderator' {
  /**
   *
   * @param roomName
   * @param xmpp
   * @param emitter
   * @param options
   */
  export default function Moderator(roomName: any, xmpp: any, emitter: any, options: any): void;
  export default class Moderator {
      /**
       *
       * @param roomName
       * @param xmpp
       * @param emitter
       * @param options
       */
      constructor(roomName: any, xmpp: any, emitter: any, options: any);
      roomName: any;
      xmppService: any;
      getNextTimeout: (reset: any) => number;
      getNextErrorTimeout: (reset: any) => number;
      externalAuthEnabled: boolean;
      options: any;
      sipGatewayEnabled: boolean;
      eventEmitter: any;
      connection: any;
      isExternalAuthEnabled(): boolean;
      isSipGatewayEnabled(): boolean;
      onMucMemberLeft(jid: any): void;
      setFocusUserJid(focusJid: any): void;
      focusUserJid: any;
      getFocusUserJid(): any;
      getFocusComponent(): any;
      createConferenceIq(): any;
      parseSessionId(resultIq: any): void;
      parseConfigOptions(resultIq: any): void;
      allocateConferenceFocus(): Promise<any>;
      _allocateConferenceFocusError(error: any, callback: Function): void;
      _allocateConferenceFocusSuccess(result: any, callback: Function): void;
      authenticate(): Promise<any>;
      getLoginUrl(urlCallback: any, failureCallback: any): void;
      _getLoginUrl(popup: boolean, urlCb: any, failureCb: any): void;
      getPopupLoginUrl(urlCallback: any, failureCallback: any): void;
      logout(callback: any): void;
  }

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/strophe.emuc' {
  const MucConnectionPlugin_base: {
      new (...args: any[]): {
          connection: any;
          init(connection: any): void;
      };
  };
  /**
   * MUC connection plugin.
   */
  export default class MucConnectionPlugin extends MucConnectionPlugin_base {
      /**
       *
       * @param xmpp
       */
      constructor(xmpp: any);
      xmpp: any;
      rooms: {};
      /**
       *
       * @param jid
       * @param password
       * @param options
       */
      createRoom(jid: any, password: any, options: any): any;
      /**
       *
       * @param jid
       */
      doLeave(jid: any): void;
      /**
       *
       * @param pres
       */
      onPresence(pres: any): boolean;
      /**
       *
       * @param pres
       */
      onPresenceUnavailable(pres: any): boolean;
      /**
       *
       * @param pres
       */
      onPresenceError(pres: any): boolean;
      /**
       *
       * @param msg
       */
      onMessage(msg: any): boolean;
      /**
       * TODO: Document
       * @param iq
       */
      onMute(iq: any): boolean;
  }
  export {};

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/strophe.jingle' {
  const JingleConnectionPlugin_base: {
      new (...args: any[]): {
          connection: any;
          init(connection: any): void;
      };
  };
  /**
   *
   */
  export default class JingleConnectionPlugin extends JingleConnectionPlugin_base {
      /**
       * Creates new <tt>JingleConnectionPlugin</tt>
       * @param {XMPP} xmpp
       * @param {EventEmitter} eventEmitter
       * @param {Object} iceConfig an object that holds the iceConfig to be passed
       * to the p2p and the jvb <tt>PeerConnection</tt>.
       */
      constructor(xmpp: any, eventEmitter: any, iceConfig: any);
      xmpp: any;
      eventEmitter: any;
      sessions: {};
      jvbIceConfig: any;
      p2pIceConfig: any;
      mediaConstraints: {
          offerToReceiveAudio: boolean;
          offerToReceiveVideo: boolean;
      };
      /**
       *
       * @param iq
       */
      onJingle(iq: any): boolean;
      /**
       * Creates new <tt>JingleSessionPC</tt> meant to be used in a direct P2P
       * connection, configured as 'initiator'.
       * @param {string} me our JID
       * @param {string} peer remote participant's JID
       * @return {JingleSessionPC}
       */
      newP2PJingleSession(me: string, peer: string): JingleSessionPC;
      /**
       *
       * @param sid
       * @param reasonCondition
       * @param reasonText
       */
      terminate(sid: any, reasonCondition: any, reasonText: any): void;
      /**
       *
       */
      getStunAndTurnCredentials(): void;
      /**
       * Returns the data saved in 'updateLog' in a format to be logged.
       */
      getLog(): {};
  }
  import JingleSessionPC from "@lyno/lib-jitsi-meet/modules/xmpp/JingleSessionPC";
  export {};

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/strophe.logger' {
  /**
   *
   */
  export default function _default(): void;

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/strophe.ping' {
  const PingConnectionPlugin_base: {
      new (...args: any[]): {
          connection: any;
          init(connection: any): void;
      };
  };
  /**
   * XEP-0199 ping plugin.
   *
   * Registers "urn:xmpp:ping" namespace under Strophe.NS.PING.
   */
  export default class PingConnectionPlugin extends PingConnectionPlugin_base {
      /**
       * Constructs new object
       * @param {Object} options
       * @param {Function} options.onPingThresholdExceeded - Callback called when ping fails too many times (controlled
       * by the {@link PING_THRESHOLD} constant).
       * @param {Function} options._getTimeSinceLastServerResponse - A function to obtain the last seen
       * response from the server.
       * @param {Object} options.pingOptions - The ping options if any.
       * @constructor
       */
      constructor({ getTimeSinceLastServerResponse, onPingThresholdExceeded, pingOptions }: {
          onPingThresholdExceeded: Function;
          _getTimeSinceLastServerResponse: Function;
          pingOptions: any;
      });
      failedPings: number;
      _onPingThresholdExceeded: Function;
      _getTimeSinceLastServerResponse: any;
      pingInterval: any;
      pingTimeout: any;
      pingThreshold: any;
      pingTimestampsToKeep: number;
      pingExecIntervals: any[];
      /**
       * Sends "ping" to given <tt>jid</tt>
       * @param jid the JID to which ping request will be sent.
       * @param success callback called on success.
       * @param error callback called on error.
       * @param timeout ms how long are we going to wait for the response. On
       * timeout <tt>error<//t> callback is called with undefined error argument.
       */
      ping(jid: any, success: any, error: any, timeout: any): void;
      /**
       * Starts to send ping in given interval to specified remote JID.
       * This plugin supports only one such task and <tt>stopInterval</tt>
       * must be called before starting a new one.
       * @param remoteJid remote JID to which ping requests will be sent to.
       */
      startInterval(remoteJid: any): void;
      intervalId: number;
      _lastServerCheck: any;
      /**
       * Stops current "ping"  interval task.
       */
      stopInterval(): void;
      /**
       * Adds the current time to the array of send ping timestamps.
       * @private
       */
      private _addPingExecutionTimestamp;
      /**
       * Returns the maximum time between the recent sent pings, if there is a
       * big value it means the computer was inactive for some time(suspended).
       * Checks the maximum gap between sending pings, considering and the
       * current time. Trying to detect computer inactivity (sleep).
       *
       * @returns {int} the time ping was suspended, if it was not 0 is returned.
       */
      getPingSuspendTime(): any;
  }
  export {};

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/strophe.rayo' {
  const RayoConnectionPlugin_base: {
      new (...args: any[]): {
          connection: any;
          init(connection: any): void;
      };
  };
  /**
   *
   */
  export default class RayoConnectionPlugin extends RayoConnectionPlugin_base {
      /**
       *
       * @param iq
       */
      onRayo(iq: any): void;
      /**
       *
       * @param to
       * @param from
       * @param roomName
       * @param roomPass
       * @param focusMucJid
       */
      dial(to: any, from: any, roomName: any, roomPass: any, focusMucJid: any): Promise<any>;
      callResource: any;
      /**
       *
       */
      hangup(): Promise<any>;
  }
  export {};

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/strophe.util' {
  /**
   *
   */
  export default function _default(): void;

}
declare module '@lyno/lib-jitsi-meet/modules/xmpp/xmpp' {
  /**
   * A list of ice servers to use by default for P2P.
   */
  export const DEFAULT_STUN_SERVERS: {
      urls: string;
  }[];
  /**
   * The name of the field used to recognize a chat message as carrying a JSON
   * payload from another endpoint.
   * If the json-message of a chat message contains a valid JSON object, and
   * the JSON has this key, then it is a valid json-message to be sent.
   */
  export const JITSI_MEET_MUC_TYPE: "type";
  /**
   * The feature used by jigasi participants.
   * @type {string}
   */
  export const FEATURE_JIGASI: string;
  /**
   * The feature used by the lib to mark support for e2ee. We use the feature by putting it in the presence
   * to avoid additional signaling (disco-info).
   * @type {string}
   */
  export const FEATURE_E2EE: string;
  /**
   *
   */
  export default class XMPP extends Listenable {
      /**
       * FIXME describe all options
       * @param {Object} options
       * @param {String} options.serviceUrl - URL passed to the XMPP client which will be used to establish XMPP
       * connection with the server.
       * @param {String} options.bosh - Deprecated, use {@code serviceUrl}.
       * @param {boolean} options.enableWebsocketResume - Enables XEP-0198 stream management which will make the XMPP
       * module try to resume the session in case the Websocket connection breaks.
       * @param {number} [options.websocketKeepAlive] - The websocket keep alive interval. See {@link XmppConnection}
       * constructor for more details.
       * @param {Object} [options.xmppPing] - The xmpp ping settings.
       * @param {Array<Object>} options.p2pStunServers see {@link JingleConnectionPlugin} for more details.
       * @param token
       */
      constructor(options: {
          serviceUrl: string;
          bosh: string;
      }, token: any);
      connection: XmppConnection;
      disconnectInProgress: boolean;
      connectionTimes: {};
      options: {
          serviceUrl: string;
          bosh: string;
      };
      token: any;
      authenticatedUser: boolean;
      caps: Caps;
      /**
       * Initializes the list of feature advertised through the disco-info
       * mechanism.
       */
      initFeaturesList(): void;
      /**
       *
       */
      getConnection(): XmppConnection;
      /**
       * Receive connection status changes and handles them.
       *
       * @param {Object} credentials
       * @param {string} credentials.jid - The user's XMPP ID passed to the
       * connect method. For example, 'user@xmpp.com'.
       * @param {string} credentials.password - The password passed to the connect
       * method.
       * @param {string} status - One of Strophe's connection status strings.
       * @param {string} [msg] - The connection error message provided by Strophe.
       */
      connectionHandler(credentials: {
          jid: string;
      }, status: string, msg?: string): void;
      speakerStatsComponentAddress: any;
      conferenceDurationComponentAddress: any;
      lobbySupported: boolean;
      anonymousConnectionFailed: boolean;
      connectionFailed: boolean;
      lastErrorMsg: string;
      /**
       *
       * @param jid
       * @param password
       */
      _connect(jid: any, password: any): void;
      /**
       * Attach to existing connection. Can be used for optimizations. For
       * example: if the connection is created on the server we can attach to it
       * and start using it.
       *
       * @param options {object} connecting options - rid, sid, jid and password.
       */
      attach(options: object): void;
      /**
       * Resets any state/flag before starting a new connection.
       * @private
       */
      private _resetState;
      /**
       *
       * @param jid
       * @param password
       */
      connect(jid: any, password: any): void;
      /**
       * Joins or creates a muc with the provided jid, created from the passed
       * in room name and muc host and onCreateResource result.
       *
       * @param {string} roomName - The name of the muc to join.
       * @param {Object} options - Configuration for how to join the muc.
       * @param {Function} [onCreateResource] - Callback to invoke when a resource
       * is to be added to the jid.
       * @returns {Promise} Resolves with an instance of a strophe muc.
       */
      createRoom(roomName: string, options: any, onCreateResource?: Function): Promise<any>;
      /**
       * Returns the jid of the participant associated with the Strophe connection.
       *
       * @returns {string} The jid of the participant.
       */
      getJid(): string;
      /**
       * Returns the logs from strophe.jingle.
       * @returns {Object}
       */
      getJingleLog(): any;
      /**
       * Returns the logs from strophe.
       */
      getXmppLog(): any;
      /**
       *
       */
      dial(...args: any[]): void;
      /**
       * Pings the server.
       * @param timeout how many ms before a timeout should occur.
       * @returns {Promise} resolved on ping success and reject on an error or
       * a timeout.
       */
      ping(timeout: any): Promise<any>;
      /**
       *
       */
      getSessions(): any;
      /**
       * Disconnects this from the XMPP server (if this is connected).
       *
       * @param {Object} ev - Optionally, the event which triggered the necessity to
       * disconnect from the XMPP server (e.g. beforeunload, unload).
       * @returns {Promise} - Resolves when the disconnect process is finished or rejects with an error.
       */
      disconnect(ev: any): Promise<any>;
      /**
       * The method is supposed to gracefully close the XMPP connection and the main goal is to make sure that the current
       * participant will be removed from the conference XMPP MUC, so that it doesn't leave a "ghost" participant behind.
       *
       * @param {Object} ev - Optionally, the event which triggered the necessity to disconnect from the XMPP server
       * (e.g. beforeunload, unload).
       * @private
       * @returns {void}
       */
      private _cleanupXmppConnection;
      /**
       *
       */
      _initStrophePlugins(): void;
      /**
       * Returns details about connection failure. Shard change or is it after
       * suspend.
       * @returns {object} contains details about a connection failure.
       * @private
       */
      private _getConnectionFailedReasonDetails;
      /**
       * Notifies speaker stats component if available that we are the new
       * dominant speaker in the conference.
       * @param {String} roomJid - The room jid where the speaker event occurred.
       */
      sendDominantSpeakerEvent(roomJid: string): void;
      /**
       * Check if the given argument is a valid JSON ENDPOINT_MESSAGE string by
       * parsing it and checking if it has a field called 'type'.
       *
       * @param {string} jsonString check if this string is a valid json string
       * and contains the special structure.
       * @returns {boolean, object} if given object is a valid JSON string, return
       * the json object. Otherwise, returns false.
       */
      tryParseJSONAndVerify(jsonString: string): boolean;
      /**
       * A private message is received, message that is not addressed to the muc.
       * We expect private message coming from plugins component if it is
       * enabled and running.
       *
       * @param {string} msg - The message.
       */
      _onPrivateMessage(msg: string): boolean;
  }
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";
  import XmppConnection from "@lyno/lib-jitsi-meet/modules/xmpp/XmppConnection";
  import Caps from "@lyno/lib-jitsi-meet/modules/xmpp/Caps";

}
declare module '@lyno/lib-jitsi-meet/service/RTC/CameraFacingMode' {
  export = CameraFacingMode;
  /**
   * The possible camera facing modes. For now support only 'user' and
   * 'environment' because 'left' and 'right' are not used anywhere in our
   * projects at the time of this writing. For more information please refer to
   * https://w3c.github.io/mediacapture-main/getusermedia.html
   * #def-constraint-facingMode.
   */
  type CameraFacingMode = string;
  namespace CameraFacingMode {
      const ENVIRONMENT: string;
      const USER: string;
  }

}
declare module '@lyno/lib-jitsi-meet/service/RTC/CodecMimeType' {
  export = CodecMimeType;
  /**
   * Enumeration of the codec mime types
   * @type {{H264: string, VP8: string, VP9: string}}
   */
  const CodecMimeType: {
      H264: string;
      VP8: string;
      VP9: string;
  };

}
declare module '@lyno/lib-jitsi-meet/service/RTC/MediaType' {
  /**
   * The audio type.
   */
  export const AUDIO: "audio";
  /**
   * The presenter type.
   */
  export const PRESENTER: "presenter";
  /**
   * The video type.
   */
  export const VIDEO: "video";

}
declare module '@lyno/lib-jitsi-meet/service/RTC/RTCEvents' {
  export const CREATE_ANSWER_FAILED: string;
  export const CREATE_OFFER_FAILED: string;
  export const DATA_CHANNEL_OPEN: string;
  export const ENDPOINT_CONN_STATUS_CHANGED: string;
  export const DOMINANT_SPEAKER_CHANGED: string;
  export const LASTN_ENDPOINT_CHANGED: string;
  export const GRANTED_PERMISSIONS: string;
  export const SENDER_VIDEO_CONSTRAINTS_CHANGED: string;
  export const LASTN_VALUE_CHANGED: string;
  export const LOCAL_TRACK_SSRC_UPDATED: string;
  export const LOCAL_TRACK_MAX_ENABLED_RESOLUTION_CHANGED: string;
  export const TRACK_ATTACHED: string;
  export const REMOTE_TRACK_ADDED: string;
  export const REMOTE_TRACK_MUTE: string;
  export const REMOTE_TRACK_REMOVED: string;
  export const REMOTE_TRACK_UNMUTE: string;
  export const SET_LOCAL_DESCRIPTION_FAILED: string;
  export const SET_REMOTE_DESCRIPTION_FAILED: string;
  export const AUDIO_OUTPUT_DEVICE_CHANGED: string;
  export const DEVICE_LIST_CHANGED: string;
  export const DEVICE_LIST_WILL_CHANGE: string;
  export const DEVICE_LIST_AVAILABLE: string;
  export const ENDPOINT_MESSAGE_RECEIVED: string;
  export const LOCAL_UFRAG_CHANGED: string;
  export const REMOTE_UFRAG_CHANGED: string;

}
declare module '@lyno/lib-jitsi-meet/service/RTC/Resolutions' {
  export = Resolutions;
  const Resolutions: {
      '1080': {
          width: number;
          height: number;
          order: number;
      };
      fullhd: {
          width: number;
          height: number;
          order: number;
      };
      '720': {
          width: number;
          height: number;
          order: number;
      };
      hd: {
          width: number;
          height: number;
          order: number;
      };
      '960': {
          width: number;
          height: number;
          order: number;
      };
      '540': {
          width: number;
          height: number;
          order: number;
      };
      qhd: {
          width: number;
          height: number;
          order: number;
      };
      '360': {
          width: number;
          height: number;
          order: number;
      };
      '640': {
          width: number;
          height: number;
          order: number;
      };
      vga: {
          width: number;
          height: number;
          order: number;
      };
      '180': {
          width: number;
          height: number;
          order: number;
      };
      '320': {
          width: number;
          height: number;
          order: number;
      };
  };

}
declare module '@lyno/lib-jitsi-meet/service/RTC/SignalingEvents' {
  /**
   * Event triggered when participant's muted status changes.
   * @param {string} endpointId the track owner's identifier (MUC nickname)
   * @param {MediaType} mediaType "audio" or "video"
   * @param {boolean} isMuted the new muted state
   */
  export const PEER_MUTED_CHANGED: "signaling.peerMuted";
  /**
   * Event triggered when participant's video type changes.
   * @param {string} endpointId the video owner's ID (MUC nickname)
   * @param {VideoType} videoType the new value
   */
  export const PEER_VIDEO_TYPE_CHANGED: "signaling.peerVideoType";

}
declare module '@lyno/lib-jitsi-meet/service/RTC/SignalingLayer' {
  /**
   * An object that carries the info about specific media type advertised by
   * participant in the signaling channel.
   * @typedef {Object} PeerMediaInfo
   * @property {boolean} muted indicates if the media is currently muted
   * @property {VideoType|undefined} videoType the type of the video if applicable
   */
  /**
   * Interface used to expose the information carried over the signaling channel
   * which is not available to the RTC module in the media SDP.
   *
   * @interface SignalingLayer
   */
  export default class SignalingLayer extends Listenable {
      /**
       * Obtains the endpoint ID for given SSRC.
       * @param {number} ssrc the SSRC number.
       * @return {string|null} the endpoint ID for given media SSRC.
       */
      getSSRCOwner(ssrc: number): string | null;
      /**
       * Obtains the info about given media advertised in the MUC presence of
       * the participant identified by the given MUC JID.
       * @param {string} owner the MUC jid of the participant for whom
       * {@link PeerMediaInfo} will be obtained.
       * @param {MediaType} mediaType the type of the media for which presence
       * info will be obtained.
       * @return {PeerMediaInfo|null} presenceInfo an object with media presence
       * info or <tt>null</tt> either if there is no presence available for given
       * JID or if the media type given is invalid.
       */
      getPeerMediaInfo(owner: string, mediaType: any): PeerMediaInfo | null;
  }
  /**
   * An object that carries the info about specific media type advertised by
   * participant in the signaling channel.
   */
  export type PeerMediaInfo = {
      /**
       * indicates if the media is currently muted
       */
      muted: boolean;
      /**
       * the type of the video if applicable
       */
      videoType: any | undefined;
  };
  import Listenable from "@lyno/lib-jitsi-meet/modules/util/Listenable";

}
declare module '@lyno/lib-jitsi-meet/service/RTC/StreamEventTypes' {
  export const EVENT_TYPE_LOCAL_CREATED: string;
  export const EVENT_TYPE_LOCAL_CHANGED: string;
  export const EVENT_TYPE_LOCAL_ENDED: string;
  export const EVENT_TYPE_REMOTE_CREATED: string;
  export const EVENT_TYPE_REMOTE_ENDED: string;
  export const TRACK_MUTE_CHANGED: string;

}
declare module '@lyno/lib-jitsi-meet/service/RTC/VideoType' {
  export = VideoType;
  /**
   * Enumeration of the video types
   * @type {{CAMERA: string, DESKTOP: string}}
   */
  const VideoType: {
      CAMERA: string;
      DESKTOP: string;
  };

}
declare module '@lyno/lib-jitsi-meet/service/authentication/AuthenticationEvents' {
  export const IDENTITY_UPDATED: string;

}
declare module '@lyno/lib-jitsi-meet/service/connectivity/ConnectionQualityEvents' {
  /**
   * Indicates that the local connection statistics were updated.
   */
  export const LOCAL_STATS_UPDATED: "cq.local_stats_updated";
  /**
   * Indicates that the connection statistics for a particular remote participant
   * were updated.
   */
  export const REMOTE_STATS_UPDATED: "cq.remote_stats_updated";

}
declare module '@lyno/lib-jitsi-meet/service/e2eping/E2ePingEvents' {
  /**
   * Indicates that the end-to-end round-trip-time for a participant has changed.
   */
  export const E2E_RTT_CHANGED: "e2eping.e2e_rtt_changed";

}
declare module '@lyno/lib-jitsi-meet/service/statistics/AnalyticsEvents' {
  /**
   * Creates a conference event.
   *
   * @param {string} action - The action of the event.
   * @param {Object} attributes - The attributes to be added to the event.
   * @returns {{type: string, source: string, action: string, attributes: object}}
   */
  export function createConferenceEvent(action: string, attributes: any): {
      type: string;
      source: string;
      action: string;
      attributes: object;
  };
  /**
   * Creates an event which contains information about the audio output problem (the user id of the affected participant,
   * the local audio levels and the remote audio levels that triggered the event).
   *
   * @param {string} userID - The user id of the affected participant.
   * @param {*} localAudioLevels - The local audio levels.
   * @param {*} remoteAudioLevels - The audio levels received from the participant.
   */
  export function createAudioOutputProblemEvent(userID: string, localAudioLevels: any, remoteAudioLevels: any): {
      type: string;
      action: string;
      attributes: {
          userID: string;
          localAudioLevels: any;
          remoteAudioLevels: any;
      };
  };
  /**
   * This class exports constants and factory methods related to the analytics
   * API provided by AnalyticsAdapter. In order for entries in a database to be
   * somewhat easily traceable back to the code which produced them, events sent
   * through analytics should be defined here.
   *
   * Since the AnalyticsAdapter API can be used in different ways, for some events
   * it is more convenient to just define the event name as a constant. For other
   * events a factory function is easier.
   *
   * A general approach for adding a new event:
   * 1. Determine the event type: track, UI, page, or operational. If in doubt use
   * operational.
   * 2. Determine whether the event is related to other existing events, and
   * which fields are desired to be set: name, action, actionSubject, source.
   * 3. If the name is sufficient (the other fields are not important), use a
   * constant. Otherwise use a factory function.
   *
   * Note that the AnalyticsAdapter uses the events passed to its functions for
   * its own purposes, and might modify them. Because of this, factory functions
   * should create new objects.
   *
   */
  /**
   * The constant which identifies an event of type "operational".
   * @type {string}
   */
  export const TYPE_OPERATIONAL: string;
  /**
   * The constant which identifies an event of type "page".
   * @type {string}
   */
  export const TYPE_PAGE: string;
  /**
   * The constant which identifies an event of type "track".
   * @type {string}
   */
  export const TYPE_TRACK: string;
  /**
   * The constant which identifies an event of type "ui".
   * @type {string}
   */
  export const TYPE_UI: string;
  /**
   * The "action" value for Jingle events which indicates that the Jingle session
   * was restarted (TODO: verify/fix the documentation)
   * @type {string}
   */
  export const ACTION_JINGLE_RESTART: string;
  /**
   * The "action" value for Jingle events which indicates that a session-accept
   * timed out (TODO: verify/fix the documentation)
   * @type {string}
   */
  export const ACTION_JINGLE_SA_TIMEOUT: string;
  /**
   * The "action" value for Jingle events which indicates that a session-initiate
   * was received.
   * @type {string}
   */
  export const ACTION_JINGLE_SI_RECEIVED: string;
  /**
   * The "action" value for Jingle events which indicates that a session-initiate
   * not arrived within a timeout (the value is specified in
   * the {@link JingleSessionPC}.
   * @type {string}
   */
  export const ACTION_JINGLE_SI_TIMEOUT: string;
  /**
   * A constant for the "terminate" action for Jingle events. TODO: verify/fix
   * the documentation)
   * @type {string}
   */
  export const ACTION_JINGLE_TERMINATE: string;
  /**
   * The "action" value for Jingle events which indicates that a transport-replace
   * was received.
   * @type {string}
   */
  export const ACTION_JINGLE_TR_RECEIVED: string;
  /**
   * The "action" value for Jingle events which indicates that a transport-replace
   * succeeded (TODO: verify/fix the documentation)
   * @type {string}
   */
  export const ACTION_JINGLE_TR_SUCCESS: string;
  /**
   * The "action" value for P2P events which indicates that P2P session initiate message has been rejected by the client
   * because the mandatory requirements were not met.
   * @type {string}
   */
  export const ACTION_P2P_DECLINED: string;
  /**
   * The "action" value for P2P events which indicates that a connection was
   * established (TODO: verify/fix the documentation)
   * @type {string}
   */
  export const ACTION_P2P_ESTABLISHED: string;
  /**
   * The "action" value for P2P events which indicates that something failed.
   * @type {string}
   */
  export const ACTION_P2P_FAILED: string;
  /**
   * The "action" value for P2P events which indicates that a switch to
   * jitsi-videobridge happened.
   * @type {string}
   */
  export const ACTION_P2P_SWITCH_TO_JVB: string;
  /**
   * The name of an event which indicates an available device. We send one such
   * event per available device once when the available devices are first known,
   * and every time that they change
   * @type {string}
   *
   * Properties:
   *      audio_input_device_count: the number of audio input devices available at
   *          the time the event was sent.
   *      audio_output_device_count: the number of audio output devices available
   *          at the time the event was sent.
   *      video_input_device_count: the number of video input devices available at
   *          the time the event was sent.
   *      video_output_device_count: the number of video output devices available
   *          at the time the event was sent.
   *      device_id: an identifier of the device described in this event.
   *      device_group_id:
   *      device_kind: one of 'audioinput', 'audiooutput', 'videoinput' or
   *          'videooutput'.
   *      device_label: a string which describes the device.
   */
  export const AVAILABLE_DEVICE: string;
  /**
   * This appears to be fired only in certain cases when the XMPP connection
   * disconnects (and it was intentional?). It is currently never observed to
   * fire in production.
   *
   * TODO: document
   *
   * Properties:
   *      message: an error message
   */
  export const CONNECTION_DISCONNECTED: "connection.disconnected";
  /**
   * Indicates that the user of the application provided feedback in terms of a
   * rating (an integer from 1 to 5) and an optional comment.
   * Properties:
   *      value: the user's rating (an integer from 1 to 5)
   *      comment: the user's comment
   */
  export const FEEDBACK: "feedback";
  /**
   * Indicates the duration of a particular phase of the ICE connectivity
   * establishment.
   *
   * Properties:
   *      phase: the ICE phase (e.g. 'gathering', 'checking', 'establishment')
   *      value: the duration in milliseconds.
   *      p2p: whether the associated ICE connection is p2p or towards a
   *          jitsi-videobridge
   *      initiator: whether the local Jingle peer is the initiator or responder
   *          in the Jingle session. XXX we probably actually care about the ICE
   *          role (controlling vs controlled), and we assume that this correlates
   *          with the Jingle initiator.
   */
  export const ICE_DURATION: "ice.duration";
  /**
   * Indicates the difference in milliseconds between the ICE establishment time
   * for the P2P and JVB connections (e.g. a value of 10 would indicate that the
   * P2P connection took 10ms more than JVB connection to establish).
   *
   * Properties:
   *      value: the difference in establishment durations in milliseconds.
   *
   */
  export const ICE_ESTABLISHMENT_DURATION_DIFF: "ice.establishment.duration.diff";
  /**
   * Indicates that the ICE state has changed.
   *
   * Properties:
   *      state: the ICE state which was entered (e.g. 'checking', 'connected',
   *          'completed', etc).
   *      value: the time in milliseconds (as reported by
   *          window.performance.now()) that the state change occurred.
   *      p2p: whether the associated ICE connection is p2p or towards a
   *          jitsi-videobridge
   *      signalingState: The signaling state of the associated PeerConnection
   *      reconnect: whether the associated Jingle session is in the process of
   *          reconnecting (or is it ICE? TODO: verify/fix the documentation)
   */
  export const ICE_STATE_CHANGED: "ice.state.changed";
  /**
   * Indicates that no bytes have been sent for the track.
   *
   * Properties:
   *      mediaType: the media type of the local track ('audio' or 'video').
   */
  export const NO_BYTES_SENT: "track.no-bytes-sent";
  /**
   * Indicates that a track was unmuted (?).
   *
   * Properties:
   *      mediaType: the media type of the local track ('audio' or 'video').
   *      trackType: the type of the track ('local' or 'remote').
   *      value: TODO: document
   */
  export const TRACK_UNMUTED: "track.unmuted";
  export function createBridgeDownEvent(): {
      action: string;
      actionSubject: string;
      type: string;
  };
  export function createConnectionFailedEvent(errorType: any, errorMessage: any, details: any): {
      type: string;
      action: string;
      attributes: any;
  };
  export function createConnectionStageReachedEvent(stage: any, attributes: any): {
      action: string;
      actionSubject: any;
      attributes: any;
      source: string;
      type: string;
  };
  export function createE2eRttEvent(participantId: any, region: any, rtt: any): {
      attributes: {
          participant_id: any;
          region: any;
          rtt: any;
      };
      name: string;
      type: string;
  };
  export function createFocusLeftEvent(): {
      action: string;
      actionSubject: string;
      type: string;
  };
  export function createGetUserMediaEvent(action: any, attributes?: {}): {
      type: string;
      source: string;
      name: string;
  };
  export function createParticipantConnectionStatusEvent(attributes?: {}): {
      type: string;
      source: string;
      name: string;
  };
  export function createJingleEvent(action: any, attributes?: {}): {
      type: string;
      action: any;
      source: string;
      attributes: {};
  };
  export function createNoDataFromSourceEvent(mediaType: string, value: any): {
      attributes: {
          media_type: string;
          value: any;
      };
      action: string;
      type: string;
  };
  export function createP2PEvent(action: any, attributes?: {}): {
      type: string;
      action: any;
      source: string;
      attributes: {};
  };
  export function createRemotelyMutedEvent(): {
      type: string;
      action: string;
  };
  export function createRtpStatsEvent(attributes: any): {
      type: string;
      action: string;
      attributes: any;
  };
  export function createRttByRegionEvent(attributes: any): {
      type: string;
      action: string;
      attributes: any;
  };
  export function createTransportStatsEvent(attributes: any): {
      type: string;
      action: string;
      attributes: any;
  };
  export function createBridgeChannelClosedEvent(code: string, reason: string): {
      type: string;
      action: string;
      attributes: {
          code: string;
          reason: string;
      };
  };
  export function createTtfmEvent(attributes: any): {
      action: string;
      actionSubject: any;
      attributes: any;
      source: string;
      type: string;
  };

}
declare module '@lyno/lib-jitsi-meet/service/statistics/Events' {
  /**
   * Notifies about audio level in RTP statistics by SSRC.
   *
   * @param ssrc - The synchronization source identifier (SSRC) of the
   * endpoint/participant whose audio level is being reported.
   * @param {number} audioLevel - The audio level of <tt>ssrc</tt> according to
   * RTP statistics.
   * @param {boolean} isLocal - <tt>true</tt> if <tt>ssrc</tt> identifies the
   * local endpoint/participant; otherwise, <tt>false</tt>.
   */
  export const AUDIO_LEVEL: "statistics.audioLevel";
  /**
   * An event fired just before the statistics module gets disposes and it's
   * the last chance to submit some logs that will end up in stats services like
   * CallStats (if enabled).
   */
  export const BEFORE_DISPOSED: "statistics.before_disposed";
  /**
   * An event carrying all statistics by ssrc.
   */
  export const BYTE_SENT_STATS: "statistics.byte_sent_stats";
  /**
   * An event carrying connection statistics.
   *
   * @param {object} connectionStats - The connection statistics carried by the
   * event such as <tt>bandwidth</tt>, <tt>bitrate</tt>, <tt>packetLoss</tt>,
   * <tt>resolution</tt>, and <tt>transport</tt>.
   */
  export const CONNECTION_STATS: "statistics.connectionstats";
  /**
   * An event carrying performance stats.
   */
  export const LONG_TASKS_STATS: "statistics.long_tasks_stats";

}
declare module '@lyno/lib-jitsi-meet/service/statistics/constants' {
  export const LOCAL_JID: string;

}
declare module '@lyno/lib-jitsi-meet/service/xmpp/XMPPEvents' {
  export const ADD_ICE_CANDIDATE_FAILED: string;
  export const AUDIO_MUTED_BY_FOCUS: string;
  export const AUTHENTICATION_REQUIRED: string;
  export const BRIDGE_DOWN: string;
  export const CALL_ACCEPTED: string;
  export const CALL_INCOMING: string;
  export const CALL_ENDED: string;
  export const CHAT_ERROR_RECEIVED: string;
  export const CONFERENCE_PROPERTIES_CHANGED: string;
  export const CONNECTION_ESTABLISHED: string;
  export const CONNECTION_FAILED: string;
  export const CONNECTION_INTERRUPTED: string;
  export const CONNECTION_RESTORED: string;
  export const CONNECTION_ICE_FAILED: string;
  export const CONNECTION_STATUS_CHANGED: string;
  export const DISPLAY_NAME_CHANGED: string;
  export const EMUC_ROOM_ADDED: string;
  export const EMUC_ROOM_REMOVED: string;
  export const ETHERPAD: string;
  export const FOCUS_DISCONNECTED: string;
  export const FOCUS_LEFT: string;
  export const GRACEFUL_SHUTDOWN: string;
  export const ICE_RESTARTING: string;
  export const ICE_RESTART_SUCCESS: string;
  export const KICKED: string;
  export const LOCAL_ROLE_CHANGED: string;
  export const MEETING_ID_SET: string;
  export const MESSAGE_RECEIVED: string;
  export const INVITE_MESSAGE_RECEIVED: string;
  export const PRIVATE_MESSAGE_RECEIVED: string;
  export const MUC_MEMBER_BOT_TYPE_CHANGED: string;
  export const MUC_DESTROYED: string;
  export const MUC_JOINED: string;
  export const MUC_MEMBER_JOINED: string;
  export const MUC_MEMBER_LEFT: string;
  export const MUC_LOBBY_MEMBER_JOINED: string;
  export const MUC_LOBBY_MEMBER_UPDATED: string;
  export const MUC_LOBBY_MEMBER_LEFT: string;
  export const MUC_DENIED_ACCESS: string;
  export const MUC_LEFT: string;
  export const MUC_ROLE_CHANGED: string;
  export const MUC_LOCK_CHANGED: string;
  export const MUC_MEMBERS_ONLY_CHANGED: string;
  export const PARTICIPANT_AUDIO_MUTED: string;
  export const PARTICIPANT_VIDEO_MUTED: string;
  export const PARTICIPANT_VIDEO_TYPE_CHANGED: string;
  export const PARTICIPANT_FEATURES_CHANGED: string;
  export const PASSWORD_REQUIRED: string;
  export const PHONE_NUMBER_CHANGED: string;
  export const PRESENCE_RECEIVED: string;
  export const PRESENCE_STATUS: string;
  export const PROMPT_FOR_LOGIN: string;
  export const READY_TO_JOIN: string;
  export const RECORDER_STATE_CHANGED: string;
  export const REMOTE_STATS: string;
  export const RENEGOTIATION_FAILED: string;
  export const RESERVATION_ERROR: string;
  export const ROOM_CONNECT_ERROR: string;
  export const ROOM_CONNECT_NOT_ALLOWED_ERROR: string;
  export const ROOM_JOIN_ERROR: string;
  export const ROOM_CONNECT_MEMBERS_ONLY_ERROR: string;
  export const ROOM_MAX_USERS_ERROR: string;
  export const SENDING_CHAT_MESSAGE: string;
  export const SENDING_PRIVATE_CHAT_MESSAGE: string;
  export const SESSION_ACCEPT_TIMEOUT: string;
  export const SPEAKER_STATS_RECEIVED: string;
  export const CONFERENCE_TIMESTAMP_RECEIVED: string;
  export const START_MUTED_FROM_FOCUS: string;
  export const SUBJECT_CHANGED: string;
  export const SUSPEND_DETECTED: string;
  export const TRANSCRIPTION_STATUS_CHANGED: string;
  export const TRANSPORT_INFO: string;
  export const VIDEO_SIP_GW_AVAILABILITY_CHANGED: string;
  export const VIDEO_SIP_GW_SESSION_STATE_CHANGED: string;
  export const ICE_CONNECTION_STATE_CHANGED: string;
  export const JSON_MESSAGE_RECEIVED: string;

}
declare module '@lyno/lib-jitsi-meet' {
  import main = require('@lyno/lib-jitsi-meet/lib-jitsi-meet.min.js');
  export = main;
}