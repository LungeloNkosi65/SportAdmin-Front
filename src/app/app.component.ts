import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormControl } from "@angular/forms";

declare var google;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {
  title = 'Angular 5';

  public sourceLatitude: number;
  public sourceLongitude: number;
  //initial center position
  public lat: Number;
  public lng: Number;
  //google maps zoom
  public zoom: Number = 14;
  public sourceAddress: string;
  public destinationAddress: string;
  public searchControl: FormControl;

  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
        //create search FormControl
        this.searchControl = new FormControl();
        this.setCurrentLocation();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.sourceAddress = autocomplete.getPlace()
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set sourceLatitude, sourceLongitude and zoom
    
          this.sourceLatitude = place.geometry.location.lat();
          this.sourceLongitude = place.geometry.location.lng();
        
          // this.destinationLatitude = -29.851595770300214;
          // this.destinationLongitude = 31.003887231738265;
         
          this.zoom = 12;
        });
      });
    });
  
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.sourceLatitude = position.coords.latitude;
        this.sourceLongitude = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.sourceLatitude, this.sourceLongitude);
      });
    }
  }

   markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.sourceLatitude = $event.coords.lat;
    this.sourceLongitude = $event.coords.lng;
    this.getAddress(this.sourceLatitude, this.sourceLongitude);
  }

  getAddress(sourceLatitude, sourceLongitude) {
    this.geoCoder.geocode({ 'location': { lat: sourceLatitude, lng: sourceLongitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.sourceAddress = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  } 

  
//Get Directions
  dir = undefined;
  public getDirection() {
    this.dir = {
      origin: { lat: this.lat, lng: this.lng},
      destination: { lat: -29.8470, lng: 31.0020 }
    }
  }

}


