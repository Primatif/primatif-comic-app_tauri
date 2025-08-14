/**
 * Logger utility for consistent logging across the application
 * Provides different log levels and namespacing for better filtering
 */

type LogLevel =
  | 'info'
  | 'debug'
  | 'warn'
  | 'error'
  | 'navigation'
  | 'api'
  | 'hydration';

interface LogOptions {
  timestamp?: boolean;
}

/**
 * Application logger with namespacing and colorized output
 */
class Logger {
  private static instance: Logger;
  private sessionStartTime: number;
  private lastLogTime: number;

  private constructor() {
    this.sessionStartTime = Date.now();
    this.lastLogTime = this.sessionStartTime;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Get time elapsed since last log or since session start
   */
  private getTimeInfo(): string {
    const now = Date.now();
    const sinceStart = ((now - this.sessionStartTime) / 1000).toFixed(2);
    const sinceLastLog = ((now - this.lastLogTime) / 1000).toFixed(2);
    this.lastLogTime = now;
    return `[${sinceStart}s | +${sinceLastLog}s]`;
  }

  /**
   * Log with a specific namespace and level
   */
  public log(
    namespace: string,
    level: LogLevel,
    message: string,
    data?: unknown,
    options: LogOptions = { timestamp: true }
  ): void {
    // Skip logging in production
    if (process.env.NODE_ENV === 'production') return;

    const timeInfo = options.timestamp ? this.getTimeInfo() : '';

    // Colorize based on log level
    let style = '';
    let prefix = '';

    switch (level) {
      case 'info':
        style = 'color: #4CAF50; font-weight: bold';
        prefix = 'ℹ️';
        break;
      case 'debug':
        style = 'color: #2196F3; font-weight: bold';
        prefix = '🔍';
        break;
      case 'warn':
        style = 'color: #FF9800; font-weight: bold';
        prefix = '⚠️';
        break;
      case 'error':
        style = 'color: #F44336; font-weight: bold';
        prefix = '❌';
        break;
      case 'navigation':
        style = 'color: #9C27B0; font-weight: bold';
        prefix = '🧭';
        break;
      case 'api':
        style = 'color: #00BCD4; font-weight: bold';
        prefix = '🔄';
        break;
      case 'hydration':
        style = 'color: #FF5722; font-weight: bold';
        prefix = '💧';
        break;
    }

    const namespaceBadge = `[${namespace}]`;

    if (data) {
      console.log(
        `%c${prefix} ${timeInfo} ${namespaceBadge} ${message}`,
        style,
        data
      );
    } else {
      console.log(
        `%c${prefix} ${timeInfo} ${namespaceBadge} ${message}`,
        style
      );
    }
  }

  // Convenience methods for different log types
  public info(namespace: string, message: string, data?: unknown): void {
    this.log(namespace, 'info', message, data);
  }

  public debug(namespace: string, message: string, data?: unknown): void {
    this.log(namespace, 'debug', message, data);
  }

  public warn(namespace: string, message: string, data?: unknown): void {
    this.log(namespace, 'warn', message, data);
  }

  public error(namespace: string, message: string, data?: unknown): void {
    this.log(namespace, 'error', message, data);
  }

  public navigation(from: string, to: string, data?: unknown): void {
    this.log('Router', 'navigation', `Navigation from ${from} to ${to}`, data);
  }

  public api(
    namespace: string,
    method: string,
    endpoint: string,
    data?: unknown
  ): void {
    this.log(namespace, 'api', `${method} ${endpoint}`, data);
  }

  public hydration(namespace: string, message: string, data?: unknown): void {
    this.log(namespace, 'hydration', message, data);
  }
}

// Export singleton instance
export const logger = Logger.getInstance();
