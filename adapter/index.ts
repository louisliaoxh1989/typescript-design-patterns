interface Logger {
  info(message: string): Promise<void>;
}

class FileLogger implements Logger {
  public async info(message: string): Promise<void> {
    console.info(message);
    console.info('This Message was saved with FileLogger');
  }
}

interface CloudLogger {
  sendToServer(message: string, type: string): Promise<void>;
}

class AwsLogger implements CloudLogger {
  public async sendToServer(message: string, type: string): Promise<void> {
    console.info(message);
    console.info('This Message was saved with AwsLogger');
  }
}

class AdapterLogger implements Logger {
  protected cloudLogger: CloudLogger;

  constructor (cloudLogger: CloudLogger) {
    this.cloudLogger = cloudLogger;
  }

  public async info(message: string): Promise<void> {
    await this.cloudLogger.sendToServer(message, 'info');
  }
}

// Implementação
class NotificationService {
  protected logger: Logger;
  
  constructor (logger: Logger) {
    this.logger = logger;
  }

  public async send(message: string): Promise<void> {
    //... Implementation
    await this.logger.info(`Notification sended: ${message}`);
  }
}

// Inicialização com o FileLogger
// (async () => {
//   const fileLogger = new FileLogger();
//   const notificationService = new NotificationService(fileLogger);
//   await notificationService.send('My notification message');
// })();


// Inicialização com o AwsLogger
(async () => {
  const awsLogger = new AwsLogger();
  const adapterLogger = new AdapterLogger(awsLogger);
  const notificationService = new NotificationService(adapterLogger);
  await notificationService.send('My notification message');
})();