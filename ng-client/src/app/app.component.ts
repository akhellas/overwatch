import { Component } from '@angular/core'

const API = 'http://localhost:7000/api/metrics'
const DELAY = 10000
const date = new Date()
const dateString = `${date.getFullYear()}/${date.getMonth() +
  1}/${date.getDate()}`
const URL = `${API}/${dateString}`

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public traffic = {}

  constructor() {
    this.refreshTraffic()
    setInterval(() => this.refreshTraffic(), DELAY)
  }

  refreshTraffic() {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.traffic = data
      })
  }
}
