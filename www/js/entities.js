function Alarm (name, active, lat, long, meter) {
    this.name = "";
    this.active = false;
    this.path = "";
    this.latitude = 0;
    this.longitude = 0;
    this.metros = 0;
    if(name !== null && name !== undefined) {
        this.name = name;
    }
    if(active !== null && active !== undefined) {
        this.active = active;
    }
    if(lat !== null && lat !== undefined) {
        this.latitude = lat;
    }
    if(long !== null && long !== undefined) {
        this.longitude = long;
    }
    if(meter !== null && meter !== undefined) {
        this.metros = meter;
    }
}