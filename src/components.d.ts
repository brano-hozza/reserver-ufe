/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ReserverApp {
        "apiBase": string;
        "basePath": string;
    }
    interface ReserverReservationEditor {
    }
    interface ReserverRoomList {
    }
}
export interface ReserverReservationEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLReserverReservationEditorElement;
}
export interface ReserverRoomListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLReserverRoomListElement;
}
declare global {
    interface HTMLReserverAppElement extends Components.ReserverApp, HTMLStencilElement {
    }
    var HTMLReserverAppElement: {
        prototype: HTMLReserverAppElement;
        new (): HTMLReserverAppElement;
    };
    interface HTMLReserverReservationEditorElementEventMap {
        "back": string;
    }
    interface HTMLReserverReservationEditorElement extends Components.ReserverReservationEditor, HTMLStencilElement {
        addEventListener<K extends keyof HTMLReserverReservationEditorElementEventMap>(type: K, listener: (this: HTMLReserverReservationEditorElement, ev: ReserverReservationEditorCustomEvent<HTMLReserverReservationEditorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLReserverReservationEditorElementEventMap>(type: K, listener: (this: HTMLReserverReservationEditorElement, ev: ReserverReservationEditorCustomEvent<HTMLReserverReservationEditorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLReserverReservationEditorElement: {
        prototype: HTMLReserverReservationEditorElement;
        new (): HTMLReserverReservationEditorElement;
    };
    interface HTMLReserverRoomListElementEventMap {
        "edit": string;
    }
    interface HTMLReserverRoomListElement extends Components.ReserverRoomList, HTMLStencilElement {
        addEventListener<K extends keyof HTMLReserverRoomListElementEventMap>(type: K, listener: (this: HTMLReserverRoomListElement, ev: ReserverRoomListCustomEvent<HTMLReserverRoomListElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLReserverRoomListElementEventMap>(type: K, listener: (this: HTMLReserverRoomListElement, ev: ReserverRoomListCustomEvent<HTMLReserverRoomListElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLReserverRoomListElement: {
        prototype: HTMLReserverRoomListElement;
        new (): HTMLReserverRoomListElement;
    };
    interface HTMLElementTagNameMap {
        "reserver-app": HTMLReserverAppElement;
        "reserver-reservation-editor": HTMLReserverReservationEditorElement;
        "reserver-room-list": HTMLReserverRoomListElement;
    }
}
declare namespace LocalJSX {
    interface ReserverApp {
        "apiBase"?: string;
        "basePath"?: string;
    }
    interface ReserverReservationEditor {
        "onBack"?: (event: ReserverReservationEditorCustomEvent<string>) => void;
    }
    interface ReserverRoomList {
        "onEdit"?: (event: ReserverRoomListCustomEvent<string>) => void;
    }
    interface IntrinsicElements {
        "reserver-app": ReserverApp;
        "reserver-reservation-editor": ReserverReservationEditor;
        "reserver-room-list": ReserverRoomList;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "reserver-app": LocalJSX.ReserverApp & JSXBase.HTMLAttributes<HTMLReserverAppElement>;
            "reserver-reservation-editor": LocalJSX.ReserverReservationEditor & JSXBase.HTMLAttributes<HTMLReserverReservationEditorElement>;
            "reserver-room-list": LocalJSX.ReserverRoomList & JSXBase.HTMLAttributes<HTMLReserverRoomListElement>;
        }
    }
}
