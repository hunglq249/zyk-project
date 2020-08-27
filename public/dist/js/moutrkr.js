$(document).ready(function () {
    new Moutrker();
})

class Moutrker{
    constructor(options){
        let defaultOptions = {

        }

        this.config ={
            ...defaultOptions,
            ...options
        };

        this.array = [];

        this.fire();
    }

    fire(){
        let progress = localStorage.getItem('trckrProgress');

        if(!progress){
            localStorage.setItem('trckrProgress', true);

            this.start();
        } else {
            this.continue();
        }
    }

    start(){
        console.log(this.array);

        this.tracking();
    }

    continue(){
        console.log(this.array);

        this.tracking();
    }

    tracking(){
        const _this = this;

        return;

        let tracking = setInterval(() => {
            _this.array.push({
                type: 'move',
                x: 1,
                y: 1
            });
        }, 1000);
    }
}

