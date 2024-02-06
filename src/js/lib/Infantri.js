export class Infantri {
    constructor(team, pos) {
        this.team = team;
        this.size = 6;
        this.pos = pos;
    }

    // parameter adalah posisi barunya
    Move(newPos){
        this.pos = newPos;
    }

    // ini dipanggil di setiap turn
    // parameter bernilai true jika ada musuh di grid tsb
    AutoAttack(u = false, d = false, l = false, r = false){
        switch (key) {
            case u:
                // serang musuh disini
                break;
            case d:    
                // serang musuh disini
                break;
            case l:
                // serang musuh disini
                break;
            case r:
                // serang musuh disini
                break;
            default:
                break;
        }
    }
}
