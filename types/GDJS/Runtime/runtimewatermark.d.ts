/// <reference types="node" />
declare namespace gdjs {
    namespace watermark {
        class RuntimeWatermark {
            _gameRenderer: RuntimeGameRenderer;
            _isDevEnvironment: boolean;
            _placement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom' | 'top';
            _showAtStartup: boolean;
            _authorUsername: string | undefined;
            _gameId: string | undefined;
            _linkElement: HTMLAnchorElement | null;
            _containerElement: HTMLDivElement | null;
            _backgroundElement: HTMLDivElement | null;
            _svgElement: SVGElement | null;
            _usernameTextElement: HTMLSpanElement | null;
            _madeWithTextElement: HTMLSpanElement | null;
            _resizeObserver: ResizeObserver | null;
            _displayDuration: number;
            _changeTextDelay: number;
            _fadeInDelayAfterGameLoaded: number;
            _fadeDuration: number;
            _fadeOutTimeout: NodeJS.Timeout | null;
            _hideTimeout: NodeJS.Timeout | null;
            _fadeOutFirstTextTimeout: NodeJS.Timeout | null;
            _fadeInSecondTextTimeout: NodeJS.Timeout | null;
            _textFontSize: number;
            _logoWidth: number;
            _logoHeight: number;
            _backgroundHeight: number;
            _margin: number;
            constructor(game: RuntimeGame, authorUsernames: Array<string>, watermarkData: WatermarkData);
            displayAtStartup(): void;
            display(): void;
            private updateFontSize;
            private updateLogoSize;
            private updateBackgroundHeight;
            private updateMargin;
            private onResizeGameContainer;
            private addWatermarkToGameContainer;
            private createBackground;
            private setupAnimations;
            private createMadeWithTextElement;
            private createUsernameTextElement;
            private updateElementMargins;
            private createLinkElement;
            private createDivContainer;
            private generateSVGLogo;
            private addStyle;
        }
    }
}
