// interface TemperatureSensor {
//   getTemperature(): Number;
// }

// class ArduinoTemperatureSensor implements TemperatureSensor {
//   protected temperature: Number = 0;
//   constructor() {
//     setInterval(this.setNewTemperature.bind(this), 2000);
//   }

//   public getTemperature(): Number {
//     return this.temperature;
//   }

//   protected setNewTemperature() {
//     const randomTemperature = Math.floor(Math.random() * 120);
//     this.setTemperature(Math.floor(randomTemperature));
//     console.info(`New Temperature: ${randomTemperature}`);
//   }
  
//   protected setTemperature(temperature: Number) {
//     this.temperature = temperature;
//   }
// }

// // Basic implementation
// class Fan {
//   protected temperatureSensor: TemperatureSensor;
//   protected running: boolean = false;
  
//   constructor(temperatureSensor: TemperatureSensor) {
//     this.temperatureSensor = temperatureSensor;
//     setInterval(this.monitorTemperature.bind(this), 100);
//   }

//   public update(temperature: Number) {
//     console.info(`Fan read temperature ${temperature}`);
//     if (temperature < 50) {
//       return this.turnOff();
//     }

//     return this.turnOn();
//   }

//   protected monitorTemperature() {
//     const temperature = this.temperatureSensor.getTemperature();
//     this.update(temperature);
//   }

//   protected turnOn () {
//     if (!this.running) {
//       this.running = true;
//       console.info('Fun started');
//     }
//   }

//   protected turnOff () {
//     if (this.running) {
//       this.running = false;
//       console.info('Fun stoped');
//     }
//   }
// }

// class TemperatureDisplay {
//   protected readonly temperatureSensor: TemperatureSensor;
  
//   constructor(temperatureSensor: TemperatureSensor) {
//     this.temperatureSensor = temperatureSensor;
//     setInterval(this.monitorTemperature.bind(this), 100);
//   }

//   public update (temperature: Number) {
//     console.info(`Display: ${temperature}`);
//   }

//   protected monitorTemperature() {
//     const temperature = this.temperatureSensor.getTemperature();
//     this.update(temperature);
//   }
// }

// // Use Basic Implementation
// const arduinoTemperatureSensor = new ArduinoTemperatureSensor();
// const fan = new Fan(arduinoTemperatureSensor);
// const temperatureDisplay = new TemperatureDisplay(arduinoTemperatureSensor);