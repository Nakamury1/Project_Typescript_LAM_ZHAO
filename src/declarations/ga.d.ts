declare var ga: (
    event: string,
    options: {
      hitType: string;
      eventCategory: string;
    }
  ) => void;

  interface Window {
    ga: (
      event: string,
      options: {
        hitType: string;
        eventCategory: string;
      }
    ) => void;
  }