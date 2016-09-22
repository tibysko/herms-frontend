export class InMemoryDataService {
  createDb() {
    let pins = [
      {
        "name": "LED_GREEN",
        "board": "raspberry",
        "type": "digital",
        "direction": "out",
        "id": "36",
        "initValue": "0"
      },
      {
        "name": "LED_BLUE",
        "board": "raspberry",
        "type": "digital",
        "direction": "out",
        "id": "38",
        "initValue": "0"
      },
      {
        "name": "LED_RED",
        "board": "arduino",
        "type": "digital",
        "direction": "out",
        "id": "12",
        "initValue": "0"
      },
      {
        "name": "BUTTON_1",
        "board": "arduino",
        "type": "digital",
        "direction": "in",
        "id": "4",
        "initValue": "0"
      }
    ];
    return { pins };
  }
}
