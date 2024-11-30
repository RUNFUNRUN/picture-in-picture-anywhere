export declare global {
  interface DocumentPictureInPictureOptions {
    width?: number;
    height?: number;
    disallowReturnToOpener?: boolean;
    preferInitialWindowPlacement?: boolean;
  }
  interface DocumentPictureInPicture {
    requestWindow: (
      options?: DocumentPictureInPictureOptions,
    ) => Promise<Window>;
  }

  var documentPictureInPicture: DocumentPictureInPicture;
}

export type Position =
  |'left-top'
  |'left-center'
  |'left-bottom'
  |'right-top'
  |'right-center'
  |'right-bottom';
