/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// import { popNotice, showNotice } from "@api/Notices";
// import { Link } from "@components/Link";
import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType, PluginNative } from "@utils/types";
// import { findByCodeLazy } from "@webpack";
import { Forms, useEffect, useState } from "@webpack/common";
const Native = VencordNative.pluginHelpers.DBusBindings as PluginNative<typeof import("./native")>;
let shortcuts;

function KeybindListen() {

    const [setKey, setSetKey] = useState(false);
    //
    //
    const [activeKey, setActiveKey] = useState(shortcuts.Vesktop);
    const [currentKey, setCurrentKey] = useState("");
    // // setActiveKey(shortcuts.Vesktop);
    const [activeClass, setActiveClass] = useState("hasValue__2636e");
    const [activeText, setActiveText] = useState("Edit Keybind");
    //
    // const toggleSetKey = () => {
    //     setSetKey(!setKey);
    //     console.log(setKey);
    //     if (setKey) {
    //         document.addEventListener("keydown", updateActiveKey, false);
    //     }
    // };
    //
    const updateActiveKey = (e: React.KeyboardEvent) => {
        if (!setKey) return;

        if (currentKey !== "") return;
        // document.removeEventListener("keydown", updateActiveKey, false);
        //     return;
        // }
        console.log(e.code, currentKey);
        // setActiveKey(activeKey + " " + e.code);
        setCurrentKey(e.code);
    };

    // const takeAction = () => {
    // setActiveKey("");
    // };


    // useEffect(() => {
    //     if (setKey) {
    //     }
    //     // return () => {
    //     //     document.removeEventListener("keydown", updateActiveKey, false);
    //     // };
    // }, [activeKey]);
    //
    useEffect(() => {
        if (setKey) {
            setCurrentKey("");
            setActiveClass("recording__2636e");
            setActiveText("Stop Recording");
            // setSetKey(true);
            console.log("SET");
            setActiveKey(activeKey + " " + currentKey);
            setCurrentKey("");
        }
        if (!setKey) {
            setActiveClass("hasValue__2636e");
            setActiveText("Edit Keybind");
            // setSetKey(false);
            console.log("NOT SET");
            // document.removeEventListener("keydown", updateActiveKey);
        }
    }, [setKey, currentKey]);
    //

    document.addEventListener("keydown", updateActiveKey, true);
    // { /* <div style={{ borderStyle: "solid", borderWidth: 1, width: 150, height: 25, backgroundColor: "lightgray", justifyContent: "center", alignItems: "center", display: "flex", borderRadius: "5px" }}>{activeCellId}</div> */ }

    return (
        <div>
            <h3 className="h5_b717a1 eyebrow_b717a1 defaultMarginh5_b717a1" id=":rck:">Keybind</h3>
            <div className={"recorderContainer__2636e container_f89b2c activeClass" + activeClass}>
                <div className="flex__7c0ba horizontal__7c0ba justifyStart_abf706 alignStretch_abf706 noWrap_abf706 recorderLayout__2636e layout_f89b2c" style={{ flex: "1 1 auto;" }}>
                    <input id="key-recorder-231" placeholder="No Keybind Set" type="text" readOnly disabled className="keybindInput__2636e input_f89b2c base_f89b2c" value={activeKey} style={{ flex: "1 1 auto" }}></input>
                    <div className="flex__7c0ba horizontal__7c0ba justifyStart_abf706 alignStretch_abf706 noWrap_abf706" style={{ flex: "0 1 auto", margin: "0px" }}>
                        <button onClick={() => {
                            setSetKey(!setKey);
                            if (!setKey) {
                                setActiveKey("");
                            }

                            // if (!setKey) {
                            //     console.log("eventlistner");
                            //     setActiveKey("");
                            //     document.addEventListener("keydown", updateActiveKey, false);
                            // }
                            // if (!setKey) {
                            // }
                            // if (!setKey) {
                            //     // Native.UpdateKeybind(activeKey);
                            // }
                        }
                        } type="button" className="addKeybindButton__2636e button_f89b2c button__201d5 lookFilled__201d5 colorPrimary__201d5 sizeMin__201d5 grow__201d5">
                            <div className="contents__201d5">
                                <span className="text__2636e">{activeText}</span>
                                <span className="editIcon__2636e"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}




const settings = definePluginSettings({
    testBind: {
        type: OptionType.COMPONENT,
        component: KeybindListen,
        description: "KeyBind"
    }
});

export default definePlugin({
    name: "DBusBindings",
    description: "DBus Bindings for Vencord, an attempt at global keybinds",
    authors: [Devs.f7c7],
    settings,
    settingsAboutComponent: () => (
        <>
            <Forms.FormTitle tag="h3"> How to use DBus Bindings </Forms.FormTitle >
            <Forms.FormText>
            </Forms.FormText>
        </>
    ),
    //
    // async handleEvent(e: MessageEvent<any>) {
    //     console.log(e);
    //     // const data = JSON.parse(e.data);
    //     //
    //     // const { activity } = data;
    //     // const assets = activity?.assets;
    //     //
    //     // if (assets?.large_image) assets.large_image = await lookupAsset(activity.application_id, assets.large_image);
    //     // if (assets?.small_image) assets.small_image = await lookupAsset(activity.application_id, assets.small_image);
    //     //
    //     // if (activity) {
    //     //     const appId = activity.application_id;
    //     //     apps[appId] ||= await lookupApp(appId);
    //     //
    //     //     const app = apps[appId];
    //     //     activity.name ||= app.name;
    //     // }
    //     //
    //     // FluxDispatcher.dispatch({ type: "LOCAL_ACTIVITY_UPDATE", ...data });
    // },
    //
    // startAt: StartAt.Init,

    async start() {

        // Webpack.onceReady.then(() => {
        // const { Variant } = dbus;
        // const {
        //     Interface, property, method, signal, DBusError,
        //     ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE
        // } = dbus.interface;
        //
        // const bus = dbus.sessionBus();
        const Session = await Native.GScreateSession();
        shortcuts = await Native.listKeybinds();
        console.log("rat", shortcuts);
        // console.log("rat", Session);
        // this.startDbus();

    },

    stop() {
        // FluxDispatcher.dispatch({ type: "LOCAL_ACTIVITY_UPDATE", activity: null }); // clear status
        // ws?.close(); // close WebSocket
    },

    async log(string) {
        console.log("dbuslogger", string);
    }
    // async startDbus() {
    //     console.log(Object.keys(Native));
    //     return "rat";
    // }
});



