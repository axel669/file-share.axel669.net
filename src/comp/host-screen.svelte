<script>
    import Button from "svelte-doric/core/button"

    import FileList from "./file-list.svelte"
    import FileSelect from "./file-select.svelte"
    import Panel from "./panel.svelte"

    import { peer, peerID } from "../state"
    import gen from "../name/gen"

    const peerURL = `${location.origin}#${$peerID}`

    let conn = null
    let connected = false
    let peerName = null
    let fileList = null
    let statusCheck = null
    const name = gen()
    const peerMessage = (message) => {
        if (message.type === "file") {
            fileList.append(message.data)
            return
        }
    }
    const greeting = (peerName) => {
        return {
            type: "greet",
            data: {
                hostName: name,
                peerName,
            }
        }
    }

    const copyURL = () => navigator.clipboard.writeText(peerURL)
    const hlURL = (evt) => evt.target.select()

    const sendFile = (evt) => conn.send({
        type: "file",
        data: evt.detail
    })

    peer.on(
        "connection",
        (peerConn) => {
            if (conn !== null) {
                peerConn.close()
                return
            }

            peerConn.on(
                "open",
                () => {
                    conn = peerConn
                    connected = true
                    peerName = gen()
                    conn.on("data", peerMessage)
                    conn.send(
                        greeting(peerName)
                    )
                    statusCheck = setInterval(
                        () => {
                            if (peerConn.open === true) {
                                return
                            }

                            connected = false
                        },
                        1000
                    )
                }
            )
        }
    )

    const disconnect = () => {
        conn?.send("test")
        // conn?.close()
    }
</script>

<style>
    app-layout {
        display: grid;
        max-width: 640px;
        margin: auto;
    }

    input {
        border-width: 0px;
        background-color: transparent;
        width: 100%;
        color: var(--text-normal);
        cursor: default;
    }
    input:focus {
        outline: none;
    }
</style>

<svelte:window on:beforeunload={disconnect} />

<app-layout>
    <Panel title="You">
        <div>{name}</div>

        <Panel title="Peer URL (Copy and send)">
            <input type="text" readonly on:focus={hlURL} value={peerURL} />
        </Panel>
    </Panel>

    <Panel title="Peer">
        {#if peerName}
            {#if connected}
                <div>{peerName}</div>
                <FileSelect on:file-select={sendFile} />
            {:else}
                Disconnected
            {/if}
        {:else}
            None
        {/if}
    </Panel>

    <FileList bind:this={fileList} />
</app-layout>
