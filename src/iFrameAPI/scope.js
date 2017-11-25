export class Scope {
    onAppLoaded(obj) {
        console.log("onAppLoaded()")

    }

    notifyTimeIsUp() {
        console.log("notifyTimeIsUp()")
        document.getElementById("app" + this.id).contentWindow.postMessage({
            message: "stop",
            toID: this.id
        }, "*")
    }

    handleMessage(event) {
        console.log("handleMessage", this.id, ":", event.data);
        if (event.data.fromID != this.id)
            return;

        switch (event.data.message) {
            // case "initialized":
            //     document.getElementById("app").contentWindow.postMessage({
            //         message: "customize",
            //         payload: {}
            //     }, "*")
            // break;
            case "init":
                let d = {
                    message: "settings",
                    payload: this.settings,
                    toID: this.id
                };
                document.getElementById("app" + this.id).contentWindow.postMessage(d, "*");
                console.log("send init", d);
                break;
            case "rendered":
                this.onRendered();
                break;
            case "setHeight":
                document.getElementById("app" + this.id).style.height = (event.data.payload.h + 50) + "px";
                break;

            case "finished":
                this.onFinished(event.data.payload);
                break;
        }
    }

    onRendered() {

    }

    onFinished() {

    }

    kill() {
        window.removeEventListener('message', this.handleMessage2)
    }

    start(settings, id) {
        this.id = id;
        this.handleMessage2 = this.handleMessage.bind(this);
        this.settings = settings;
        window.addEventListener('message', this.handleMessage2)

    }
}
