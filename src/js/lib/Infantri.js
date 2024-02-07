export class Infantri {
    constructor(id, team, pos) {
        this.id = id;
        this.team = team;
        this.size = 6;
        this.pos = pos;
        this.icon = "";
        if (team == "blue") {
            this.icon = "InfBlue.png";
        } else if (team == "red") {
            this.icon = "InfRed.png";
        } 
    } 

    // parameter adalah posisi barunya
    move(newPos) {
        this.pos = newPos;
    }

    // ini dipanggil di setiap turn
    // parameter bernilai true jika ada musuh di grid tsb
    // enemyPos = {
    //     u: false,
    //     d: false,
    //     l: false,
    //     r: false,
    // };
    autoAttack(enemyPos) {
        if (enemyPos.u) {
            this.attackUp();
        }
        if (enemyPos.d) {
            this.attackDown();
        }
        if (enemyPos.l) {
            this.attackLeft();
        }
        if (enemyPos.r) {
            this.attackRight();
        }
    }

    // Logika serangan sesuai dengan arah
    attackUp() {
        // Serang musuh ke atas
    }

    attackDown() {
        // Serang musuh ke bawah
    }

    attackLeft() {
        // Serang musuh ke kiri
    }

    attackRight() {
        // Serang musuh ke kanan
    }
}