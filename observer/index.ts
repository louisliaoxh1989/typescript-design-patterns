interface Observer {
  notify(temperature: Number): void;
}

interface Subject {
  registerObserver(observer: Observer): void;
  unregisterObserver(observer: Observer): void;
  notifyObservers(): void;
}

interface TemperatureSensor extends Subject {
  getTemperature(): Number;
}

class ArduinoTemperatureSensor implements TemperatureSensor {
  protected temperature: Number = 0;
  protected observers: Observer[] = [];

  constructor() {
    setInterval(this.setNewTemperature.bind(this), 2000);
  }

  public registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public unregisterObserver(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer )
  }

  public notifyObservers(): void {
    this.observers.forEach((observer) => observer.notify(this.getTemperature()));
  }

  public getTemperature(): Number {
    return this.temperature;
  }

  protected setNewTemperature() {
    const randomTemperature = Math.floor(Math.random() * 120);
    console.info(`New Temperature: ${randomTemperature}`);
    this.setTemperature(Math.floor(randomTemperature));
  }
  
  protected setTemperature(temperature: Number) {
    this.temperature = temperature;
    this.notifyObservers();
  }
}

class Fan implements Observer {
  protected temperatureSubject: Subject;
  protected running: boolean = false;
  
  constructor(temperatureSubject: Subject) {
    this.temperatureSubject = temperatureSubject;
    this.temperatureSubject.registerObserver(this);
  }

  public notify(temperature: Number) {
    console.info(`Fan read temperature ${temperature}`);
    if (temperature < 50) {
      return this.turnOff();
    }

    return this.turnOn();
  }

  protected turnOn () {
    if (!this.running) {
      this.running = true;
      console.info('Fan started');
    }
  }
  
  protected turnOff () {
    if (this.running) {
      this.running = false;
      console.info('Fan stoped');
    }
  }
}

class TemperatureDisplay implements Observer {
  protected readonly temperatureSubject: Subject;
  
  constructor(temperatureSubject: Subject) {
    this.temperatureSubject = temperatureSubject;
    this.temperatureSubject.registerObserver(this);
  }

  public notify(temperature: Number) {
    console.info(`Display: ${temperature}`);
  }
}

// Use Observer Implementation
const arduinoTemperatureSensor = new ArduinoTemperatureSensor();
const fan = new Fan(arduinoTemperatureSensor);
const temperatureDisplay = new TemperatureDisplay(arduinoTemperatureSensor);
