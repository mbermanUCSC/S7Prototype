class CoreGameplay extends Phaser.Scene {
    constructor() {
        super('core gameplay');
    }

    preload() {
        this.load.image('player', 'assets/rolly.png');
        this.load.image('slug', 'assets/slug.png');
    }
    
    create() {
        this.player = this.physics.add.image(100, 800, 'player').setScale(0.25);
        this.slugs = this.physics.add.group({
            key: 'slug',
            repeat: 1,
            setXY: { x: 1000, y: 800, stepX: 800},
            velocityX: -100
        });
        for (const slug of this.slugs.getChildren()){
            slug.setScale(0.25);
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        let ground = this.add.rectangle(0, 900, 1920, 200, 0x989898).setOrigin(0, 0);
        this.ground = this.physics.add.existing(ground, true);

        this.physics.add.collider(this.ground, this.player);
        this.physics.add.collider(this.ground, this.slugs);
        this.physics.add.collider(this.slugs, this.player);
        this.physics.add.overlap(this.player, this.slugs, (player, slug) => { 
            console.log(this.player.y);
            if (this.player.y > 879 && this.player.y < 883) {
                this.scene.start('core gameplay');
            }
        });
    }

    update() {
        const {left, right, up} = this.cursors;
        // moving left to right
        if (left.isDown)
        {
            this.player.setVelocityX(-160);    
        }
        else if (right.isDown)
        {
            this.player.setVelocityX(160);   
        }
        else
        {   
            this.player.setVelocityX(0);  
        }
        // jump
        if (up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-300);
        }
    }
    
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: { 
            //debug: true ,
            gravity: {
                y: 200
            },
        },
    },
    backgroundColor: 0x212121,
    scene: [CoreGameplay],
    title: "Game",
});