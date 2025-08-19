addLayer("c", {
    name: "终局",
    symbol: "🏁​",
    resource: " ",
    color: "#ff73b3",
    row: "1",
    tooltip: "",
    position: 3,
    layerShown() { return hasMilestone('m', 8) },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    update(diff) {
        if (inChallenge(this.layer, 11)) {
            player.count += diff * 6
            if (endStr[Math.floor(player.count)] == "<") player.count += 8
        }
    },
    tabFormat: [
        "challenges",
        "br",
        ["infobox", 0]
    ],
    challenges: {
        11: {
            name: "42",
            challengeDescription() {
                return "阅读信件"
            },
            goalDescription() {
                return "看见答案"
            },
            rewardDescription() {
                return "完结游戏"
            },
            canComplete() {
                return player.count >= endStr.length
            },
            unlocked() {
                return true
            },
            completionLimit: 1
        },
    },
    infoboxes: {
        0: {
            title: "宇宙的答案",
            body() {
                let length = Math.floor(player.count);

                const maxLength = Math.min(length, endStr.length);

                const word = endStr.substring(0, maxLength);

                return `<span class="c1" style="animation:unset">${word}</span><br><br>${randomString(endStr.length - length)}`
            },
            unlocked() { return inChallenge(this.layer, 11) || hasChallenge(this.layer, 11) }
        },
    },
})