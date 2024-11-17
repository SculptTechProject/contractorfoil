/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_USE_RECAPTCHA: "true" | "false";
    // Inne zmienne środowiskowe
  }
}