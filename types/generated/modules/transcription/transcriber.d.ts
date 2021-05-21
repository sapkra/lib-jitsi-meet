declare const AudioRecorder: any;
declare const SphinxService: any;
declare const BEFORE_STATE = "before";
declare const RECORDING_STATE = "recording";
declare const TRANSCRIBING_STATE = "transcribing";
declare const FINISHED_STATE = "finished";
declare const MAXIMUM_SENTENCE_LENGTH = 80;
/**
 * This is the main object for handing the Transcription. It interacts with
 * the audioRecorder to record every person in a conference and sends the
 * recorder audio to a transcriptionService. The returned speech-to-text result
 * will be merged to create a transcript
 * @param {AudioRecorder} audioRecorder An audioRecorder recording a conference
 */
declare function Transcriber(): void;
/**
 * This method gets the answer from the transcription service, calculates the
 * offset and adds is to every Word object. It will also start the merging
 * when every send request has been received
 *
 * note: Make sure to bind this as a Transcription object
 * @param {Transcriber} transcriber the transcriber instance
 * @param {RecordingResult} answer a RecordingResult object with a defined
 * WordArray
 */
declare function blobCallBack(transcriber: any, answer: any): void;
/**
 * Check if the given 2 dimensional array has any non-zero Word-arrays in them.
 * All zero-element arrays inside will be removed
 * If any non-zero-element arrays are found, the method will return true.
 * otherwise it will return false
 * @param {Array<Array>} twoDimensionalArray the array to check
 * @returns {boolean} true if any non-zero arrays inside, otherwise false
 */
declare function hasPopulatedArrays(twoDimensionalArray: any): boolean;
/**
 * Push a word to the right location in a sorted array. The array is sorted
 * from lowest to highest start time. Every word is stored in an object which
 * includes the name of the person saying the word.
 *
 * @param {Array<Word>} array the sorted array to push to
 * @param {Word} word the word to push into the array
 */
declare function pushWordToSortedArray(array: any, word: any): void;
