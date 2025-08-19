
/*
   SSSSSSSSSSSSSSS 
 SS:::::::::::::::S
S:::::SSSSSS::::::S
S:::::S     SSSSSSS
S:::::S            
S:::::S            
 S::::SSSS         
  SS::::::SSSSS    
    SSS::::::::SS  
       SSSSSS::::S 
            S:::::S
            S:::::S
SSSSSSS     S:::::S
S::::::SSSSSS:::::S
S:::::::::::::::SS 
 SSSSSSSSSSSSSSS   
*/
addLayer("s1", {
    name: "猫猫",
    symbol: "🐈️",
    resource: "猫猫",
    row: 1,
    position: 0,
    color: "#db5563",
    type: "none",
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    update(diff) {
        if (hasUpgrade("s1", 11)) {
            player[this.layer].points = player[this.layer].points.add(
                nomachineSpeed()
                    .div(
                        hasUpgrade("s1", 13) ? _D(5) : _D(20)
                    )
                    .mul(hasChallenge("s1", 11) ? _D3 : _D1)
                    .mul(diff)
            )
        }
        
        if (inChallenge(this.layer, 11)) {
            if (layers[this.layer].bosshp.gt(_D0)) {
                layers[this.layer].bosshp = Decimal.min(_D(10000),
                    layers[this.layer].bosshp
                        .sub(player[this.layer].points.div(8).mul(diff))
                        .add(_D(15).mul(diff))
                )
            }
            if (layers[this.layer].bosshp.gt(_D0)) {
                player[this.layer].points = player[this.layer].points
                    .pow(_D(0.97).pow(diff))
            }
        }
    },
    infoboxes: {
        0: {
            title: "萨玛定理 - 公理",
            body() {
                return `
                此世界由猫组成,除此之外空间内基本上什么都没有<br>
                你在这里发现了少量梦境能量,你可以拿走它们<br>
                随着时间,这里会涌现出很多猫猫,你觉得这一层是安全的<br>
                ` },
        },
    },
    tabFormat: [
        ["infobox", 0],
        "main-display",
        ["display-text", function () {
            return "加成最终梦境获取×" + format(layers[this.layer].effect()[0])
        }],
        ["display-text", function () {
            return hasUpgrade("s1", 14) ? "加成时间流速×" + format(layers[this.layer].effect()[1]) : ""
        }],
        "blank",
        "upgrades",
        "challenges",
    ],
    effect() {
        return [
            player[this.layer].points.add(_D1).pow(
                hasUpgrade("s1", 12) ? _D(0.4) : _D(0.01)
            )
            ,
            player[this.layer].points.add(_D1).log(4).pow(
                hasUpgrade("s1", 14) ? _D(0.5) : _D(0)
            )
        ]
    },
    upgrades: {
        11: {
            title: "喵",
            description: "喵呜~喵喵喵!喵喵",
            tooltip: "你看到了一只猫",
            cost: _D0,
        },
        12: {
            title: "喵喵",
            description: "喵喵喵!喵~喵嗷~~喵呜",
            tooltip: "你看到了很多猫",
            cost: _D(372),
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "喵喵喵",
            description: "喵呜喵呜喵~呼噜呼噜~咪嗷",
            tooltip: "你已经不想再见到猫了",
            cost: _D(559),
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        14: {
            title: "喵喵喵喵",
            description: "喵喵~咕噜咕噜!",
            tooltip: "但你发现这里只有猫",
            cost: _D(2000),
            unlocked() {
                return hasUpgrade(this.layer, 13)
            }
        },
        15: {
            title: "喵喵喵喵喵",
            description: "喵喵?喵呜!哈!!!喵~...喵呜~...",
            tooltip: "我操,前面有个略猫区",
            cost: _D(10000),
            unlocked() {
                return hasUpgrade(this.layer, 14)
            }
        }
    },
    challenges: {
        11: {
            name: "呜",
            challengeDescription() {
                return "喵呜!喵喵,喵喵喵!咪咪喵~喵!<br>挑战时请勿刷新页面" +
                    (inChallenge(this.layer, 11) ? `<br>HP ${format(layers[this.layer].bosshp)}/${format(10000)}` : "")
            },
            goalDescription() {
                return "喵喵,喵喵喵!"
            },
            rewardDescription() {
                return "1 世界完成<br>获得体验成本指数-0.1<br>获得猫猫速度×3"
            },
            canComplete() {
                return layers[this.layer].bosshp.lte(0)
            },
            unlocked() {
                return hasUpgrade(this.layer, 15)
            },
            onEnter() {
                layers[this.layer].bosshp = _D(10000)
            },
            onExit() {
                layers[this.layer].bosshp = _D(10000)
            },
            completionLimit: 1
        },
    },
    doReset(resettingLayer) {
        return
    },
    layerShown() { return hasMilestone("m", 5) },
    hotkeys: [
    ],
    bosshp: _D(10000),
    branches: ["s2"]
});

addLayer("s2", {
    name: "对数",
    symbol: "🌳",
    resource: "对数",
    row: 2,
    position: 0,
    color: "#ab6c13",
    type: "null",
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    update(diff) {
        diff = Decimal.min(diff, _D(0.1))

        let l = player["S2"];

        l.log.log = (
            ((_D2).pow(l.log.log))
                .add(hasUpgrade("s2", 11) ?
                    upgradeEffect("s2", 11)
                        .mul(diff)
                    : _D0)
        ).log(_D2)
            .add(hasUpgrade("s2", 44) ?
                upgradeEffect("s2", 44)
                    .mul(diff)
                : _D0)

        l.antilog.log = l.antilog.log.add((!hasChallenge("s2", 11) && hasUpgrade("s2", 65) ?
            l.log.log.add(1).div(10)
            : _D1).mul(diff))

        if (hasUpgrade("s2", 32) && l.log.log.lte(999)) {
            let t = (_D1.add(upgradeEffect("s2", 32).div(_D100))).pow(diff)
            l.log.log = l.log.log.mul(t)
            if (hasUpgrade("s2", 43) && l.antilog.log.lt(_D0)) l.antilog.log = l.antilog.log.mul(t)
        }

        if (hasUpgrade("s2", 53)) {
            let d = l.antilog.log.mul(_D1.sub((_D1.sub(upgradeEffect("s2", 53).div(_D100))).pow(diff)))
            l.log.log = l.log.log.sub(d)
            l.antilog.log = l.antilog.log.sub(d)
        }

        if (l.antilog.log.gte(l.log.log)) {
            if (hasUpgrade("s2", 42) && (upgradeEffect("s2", 42) > 0)) {
                player.S2.t42 -= diff;

                l.log.points = _D(2).pow(l.log.log)
                l.antilog.points = _D(2).pow(l.antilog.log)
                return
            }
            this.annihilation()
        }

        l.log.points = _D(2).pow(l.log.log)
        player[this.layer].points = l.log.log
        l.antilog.points = _D(2).pow(l.antilog.log)
    },
    annihilation() {
        let l = player["S2"];
        l.log.log = hasChallenge("s2", 11) && hasUpgrade("s2", 65) ? _D(50) : _D0
        l.antilog.log = _D(-30).add(hasUpgrade("s2", 41) ? upgradeEffect("s2", 41) : _D(0))
        l.t42 = 10
    },
    infoboxes: {
        0: {
            title: "萨玛定理 - 引理",
            body() {
                return `
                这个世界略显混乱,所以你可能需要思考升级的购买顺序<br>
                有两种数,一种是对数,一种是错数<br>
                对数是宇宙的基石,错数是湮灭一切的祸根<br>
                永远不要容忍任何错误存在于你的世界中<br>
                否则你将终生抱憾<br>
                [为了避免可能存在的破坏,本层最大tick长度为100ms]
                ` },
        },
    },
    clickables: {
        11: {
            title() {
                return `<h2
            style="color:hsl(${(Date.now() / 15) % 360}, 100%, 50%);
            text-shadow: 0 0 10px hsl(${(Date.now() / 15 + 180) % 360}, 100%, 30%);
            ">卡关重置(A)</h2>`
            },
            style() {
                return {
                    width: "180px",
                    height: "80px",
                    minHeight: "60px",
                    background: `linear-gradient(in hsl longer hue to right, 
                hsl(${(-Date.now() / 35) % 360}, 50%, 30%), 
                hsl(${(-Date.now() / 35 + 1) % 360}, 50%, 30%)`,
                    border: "4px solid",
                    borderRadius: "4px",
                    borderColor: "rgba(0, 0, 0, 0.125)"
                }
            },
            canClick() {
                return true
            },
            unlocked() {
                return !hasChallenge(this.layer, 11)
            },
            onClick() {
                player["S2"] = {
                    log: {
                        points: _D1,
                        log: _D0
                    },
                    antilog: {
                        points: _D0,
                        log: _D(-30)
                    }
                }
                player[this.layer].upgrades = []
            },
        },
    },
    tabFormat: [
        ["infobox", 0],
        "clickables",
        "main-s2-1-display",
        "main-s2-2-display",
        "blank",
        ["display-text", function () {
            return `自然湮灭预计在 ${format(player["S2"].antilog.log.gte(player["S2"].log.log) ? upgradeEffect("s2", 42) : (player["S2"].log.log.sub(player["S2"].antilog.log)
                .add(hasUpgrade("s2", 42) ? (upgradeEffect("s2", 42)) : _D0)))} 秒后(购买升级后变得不那么准)`
        }],
        ["display-text", function () {
            return `大约能获得 ${formatSmall((
                ((_D2).pow(player["S2"].log.log))
                    .add(hasUpgrade("s2", 11) ?
                        upgradeEffect("s2", 11)
                            .mul(player["S2"].antilog.log.gte(player["S2"].log.log) ? upgradeEffect("s2", 42) : (player["S2"].log.log.sub(player["S2"].antilog.log)
                                .add(hasUpgrade("s2", 42) ? (upgradeEffect("s2", 42)) : _D0)))
                        : _D0)
            ).log(_D2).add(hasUpgrade("s2", 44) ?
                upgradeEffect("s2", 44)
                    .mul(player["S2"].antilog.log.gte(player["S2"].log.log) ? upgradeEffect("s2", 42) : (player["S2"].log.log.sub(player["S2"].antilog.log)
                        .add(hasUpgrade("s2", 42) ? (upgradeEffect("s2", 42)) : _D0)))
                : _D0))} 对数(请不要依赖这个,尤其是湮灭距离10秒以上)`
        }],
        "blank",
        "upgrades",
        "challenges",
    ],
    upgrades: {
        11: {
            fullDisplay() {
                return `
				<span><h3>${"常数发生器"}</h3></span><br>
				<span>${"每秒获得1常数"}</span><br>
                <span>
                效果: +${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${this.price} 对数
			    </span>
            `
            },
            effect() {
                return _D1
                    .mul(hasUpgrade("s2", 21) ? upgradeEffect("s2", 21) : _D1)
                    .mul(hasUpgrade("s2", 22) ? upgradeEffect("s2", 22) : _D1)
                    .mul(hasUpgrade("s2", 31) ? upgradeEffect("s2", 31) : _D1)
                    .pow(hasUpgrade("s2", 33) ? upgradeEffect("s2", 33) : _D1)
            },
            tooltip: "改变这个世界,直到湮灭",
            canAfford() {
                return player["S2"].log.log.gte(this.price)
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price)
            },
            price: _D0
        },
        21: {
            fullDisplay() {
                return `
				<span><h3>${"对数推进器"}</h3></span><br>
				<span>${"常数获取×(对数+1)"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 21)) return 0
                return player["S2"].log.log.add(_D1)
                    .pow(hasUpgrade("s2", 52) ? upgradeEffect("s2", 52) : _D1)
            },
            unlocked() {
                return hasUpgrade("s2", 11)
            },
            tooltip: "利用正确的道路,为自己所做打下基础",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D5.add(hasUpgrade("s2", 22) ? _D(2.5) : _D0)
            }
        },
        22: {
            fullDisplay() {
                return `
				<span><h3>${"错数推进器"}</h3></span><br>
				<span>${"常数获取×(错数绝对值平方根+1.5)"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 22)) return 0
                return (player["S2"].antilog.log.abs()).pow(divNum(_D2)).add(_D(1.5))
                    .pow(hasUpgrade("s2", 52) ? upgradeEffect("s2", 52) : _D1)
            },
            unlocked() {
                return hasUpgrade("s2", 11)
            },
            tooltip: "有的时候,暗处的东西可能更迷人,但也更危险",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D5.add(hasUpgrade("s2", 21) ? _D(2.5) : _D0)
            }
        },
        31: {
            fullDisplay() {
                return `
				<span><h3>${"谬误倍增器"}</h3></span><br>
				<span>${"常数获取×异数的错数次根的平方的对错膨胀机基础百分比的100倍"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 31)) return 0
                return _D(3.56)
            },
            unlocked() {
                return hasUpgrade("s2", 21) && hasUpgrade("s2", 22)
            },
            tooltip: "这个机器的存在仿佛就是一种谬误,你读不懂它",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D10
                    .add(hasUpgrade("s2", 32) ? _D(3.5) : _D0)
                    .add(hasUpgrade("s2", 33) ? _D(3.5) : _D0)
            }
        },
        32: {
            fullDisplay() {
                return `
				<span><h3>${"对错膨胀机"}</h3></span><br>
				<span>${(hasUpgrade("s2", 43) ? "对数每秒膨胀一个小于100但大于0的百分比" : "对数和错数每秒膨胀一个小于100但大于0的百分比") + (hasChallenge("s2", 11) ? "<br>999对数后不再生效" : "")}</span><br>
                <span>
                效果: ${format(this.effect())}%
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 32)) return 0
                return _D(0.84).mul(hasUpgrade("s2", 43) ? upgradeEffect("s2", 43) : _D1)
            },
            unlocked() {
                return hasUpgrade("s2", 21) && hasUpgrade("s2", 22)
            },
            tooltip: "你可能也发现了,前方是毁灭,亦是重生",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D10
                    .add(hasUpgrade("s2", 31) ? _D(3.5) : _D0)
                    .add(hasUpgrade("s2", 33) ? _D(3.5) : _D0)
            }
        },
        33: {
            fullDisplay() {
                return `
				<span><h3>${"维度展开机"}</h3></span><br>
				<span>${"常数获取^(V<sub>球</sub>/πr³)"}</span><br>
                <span>
                效果: ^${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 33)) return 0
                return _D(4 / 3)
            },
            unlocked() {
                return hasUpgrade("s2", 21) && hasUpgrade("s2", 22)
            },
            tooltip: "维度,展开!现在你看到了一个球,但有什么用?",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D10
                    .add(hasUpgrade("s2", 31) ? _D(3.5) : _D0)
                    .add(hasUpgrade("s2", 32) ? _D(3.5) : _D0)
            }
        },
        41: {
            fullDisplay() {
                return `
				<span><h3>${"污染对冲机"}</h3></span><br>
				<span>${"降低错数的起始值"}</span><br>
                <span>
                效果: ${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 41)) return 0
                return _D(-15)
            },
            unlocked() {
                return hasUpgrade("s2", 31) && hasUpgrade("s2", 32) && hasUpgrade("s2", 33)
            },
            tooltip: "这些脏污令人感到反胃,你不想再看到这些",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(20)
                    .add(hasUpgrade("s2", 42) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 43) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 44) ? _D(5) : _D0)
            }
        },
        42: {
            fullDisplay() {
                return `
				<span><h3>${"给我时间机"}</h3></span><br>
				<span>${"我只需要一首歌的时间,但这首歌是(^ ^),你甚至有空听两遍"}</span><br>
                <span>
                效果: ${formatTime(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 42)) return 0
                return player["S2"].t42
            },
            unlocked() {
                return hasUpgrade("s2", 31) && hasUpgrade("s2", 32) && hasUpgrade("s2", 33)
            },
            tooltip: "能不能给我一首歌的时间~~~",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(20)
                    .add(hasUpgrade("s2", 41) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 43) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 44) ? _D(5) : _D0)
            }
        },
        43: {
            fullDisplay() {
                return `
				<span><h3>${"冗余卸载机"}</h3></span><br>
				<span>${"对错膨胀机更强一点点且的效果在错数大于0时错数膨胀不再生效"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 43)) return 0
                return _D(1.111)
            },
            unlocked() {
                return hasUpgrade("s2", 31) && hasUpgrade("s2", 32) && hasUpgrade("s2", 33)
            },
            tooltip: "你改装了对错膨胀机,现在前方只有重生了,但你分数不是0",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(20)
                    .add(hasUpgrade("s2", 41) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 42) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 44) ? _D(5) : _D0)
            }
        },
        44: {
            fullDisplay() {
                return `
				<span><h3>${"愚蠢的人机"}</h3></span><br>
				<span>${"每秒获得非常少的一点点你根本看不上的对数"}</span><br>
                <span>
                效果: +${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 44)) return 0
                return _D(0.045)
            },
            unlocked() {
                return hasUpgrade("s2", 31) && hasUpgrade("s2", 32) && hasUpgrade("s2", 33)
            },
            tooltip: "它只是愚蠢的以为自己真的有很大用!",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(20)
                    .add(hasUpgrade("s2", 41) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 42) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 43) ? _D(5) : _D0)
            }
        },
        51: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade("s2", 52) && hasUpgrade("s2", 53) ? "无能狂怒机" : "超级炸档机"}</h3></span><br>
				<span>${hasUpgrade("s2", 52) && hasUpgrade("s2", 53) ? "哈哈,你现在该点我了" : "你不需要点这个升级也能解锁下一层的内容,请不要点这个升级"}</span><br>
                <span>
                效果: ${this.effect()}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 51)) return "/0.000"
                if (hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) return "解锁下一层"
                return "你他妈还真点啊"
            },
            unlocked() {
                return hasUpgrade("s2", 41) && hasUpgrade("s2", 42) && hasUpgrade("s2", 43) && hasUpgrade("s2", 43)
            },
            tooltip: "你想点了对吧!",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(hasUpgrade("s2", 52) ? _D(10) : _D0)
                    .add(hasUpgrade("s2", 53) ? _D(-10) : _D0)
            }
        },
        52: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade("s2", 52) ? "超级推进机" : "青红皂白机"}</h3></span><br>
				<span>${hasUpgrade("s2", 52) ? "大幅削弱它们的变缓力量也是削弱" : "我管你对错,全部给我清零,大幅削弱第二层升级"}</span><br>
                <span>
                效果: ^${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 52)) return 0
                return _D(1.14514)
            },
            unlocked() {
                return hasUpgrade("s2", 41) && hasUpgrade("s2", 42) && hasUpgrade("s2", 43) && hasUpgrade("s2", 43)
            },
            tooltip: "",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(hasUpgrade("s2", 51) ? _DInf : _D0)
                    .add(hasUpgrade("s2", 53) ? _D(10) : _D0)
            }
        },
        53: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade("s2", 53) ? "粒子对撞机" : "错数屠宰机"}</h3></span><br>
				<span>${hasUpgrade("s2", 53) ? "用对数每秒抵消一定数量的错数" : "每秒消耗一定数量的错数(比例非常低,垃圾)"}</span><br>
                <span>
                效果: ${format(this.effect())}%
			    </span>
				<br><br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            effect() {
                if (!hasUpgrade("s2", 53)) return 0
                return _D(0.975)
            },
            unlocked() {
                return hasUpgrade("s2", 41) && hasUpgrade("s2", 42) && hasUpgrade("s2", 43) && hasUpgrade("s2", 43)
            },
            tooltip: "蹦蹦蹦擦!炸了它们!",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(hasUpgrade("s2", 51) ? _DInf : _D0)
                    .add(hasUpgrade("s2", 52) ? _D(10) : _D0)
            }
        },
        61: {
            fullDisplay() {
                return `
				<span><h3>${"这题你选择A选项"}</h3></span><br>
				<span>${"并将其涂在答题卡上"}</span><br>
                <br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 51) && !hasUpgrade("s2", 63)
            },
            tooltip: "D Nigger Roader",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(!(hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) ? _DInf : _D0)
            }
        },
        62: {
            fullDisplay() {
                return `
				<span><h3>${"这题你选择B选项"}</h3></span><br>
				<span>${"并将其涂在答题卡上"}</span><br>
                <br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 51) && !hasUpgrade("s2", 63)
            },
            tooltip: "A Nova Riverse",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(!(hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) ? _DInf : _D0)
            }
        },
        63: {
            fullDisplay() {
                return `
				<span><h3>${"这题你选择C选项"}</h3></span><br>
				<span>${"并将其涂在答题卡上"}</span><br>
                <br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 51) && !hasUpgrade("s2", 61) && !hasUpgrade("s2", 62) && !hasUpgrade("s2", 64)
            },
            tooltip: "B Nonafter Romantic",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(!(hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) ? _DInf : _D0)
            }
        },
        64: {
            fullDisplay() {
                return `
				<span><h3>${"这题你选择D选项"}</h3></span><br>
				<span>${"并将其涂在答题卡上"}</span><br>
                <br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 51) && !hasUpgrade("s2", 63)
            },
            tooltip: "C Napper Rinator",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(!(hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) ? _DInf : _D0)
            }
        },
        65: {
            fullDisplay() {
                return `
				<span><h3>${"鲤鱼跃门机"}</h3></span><br>
				<span>${hasChallenge("s2", 11) ? "每次湮灭后以50对数为起点" : "一次性获得很多对数,你要好好使用哦!"}</span><br>
                <br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 63)
            },
            tooltip() {
                return hasChallenge("s2", 11) ? "初始获得50对数" : "获得50对数,但错数开始快速膨胀"
            },
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(-50)
            }
        },
        66: {
            fullDisplay() {
                return `
				<span><h3>${"成就提取机"}</h3></span><br>
				<span>${"你是没发现走错路还是直奔我这个成就来的?"}</span><br>
                <br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 61) && hasUpgrade("s2", 62) && hasUpgrade("s2", 64)
            },
            tooltip: "获得一个成就",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D0
            }
        },
        71: {
            fullDisplay() {
                return `
				<span><h3>${"机器制造机"}</h3></span><br>
				<span>${"获得引理证明机"}</span><br>
                <br>
                <span>
                开销: ${format(this.price(), 1)} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 65)
            },
            tooltip: "我有证明,但这里写不下",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D100
            }
        },
    },
    challenges: {
        11: {
            name: "引理证明机",
            challengeDescription() {
                return "最终,我们证明了引理<br>提前中止挑战将会导致一次湮灭"
            },
            goalDescription() {
                return "26对数"
            },
            rewardDescription() {
                return `1 世界完成<br>获得体验 & 汲取思维成本指数-0.1<br>对数加成最终梦境获取x${format(player["S2"].log.log.add(_D1))}<br>改善鲤鱼跃门机<br>时间流速×3`
            },
            canComplete() {
                return player["S2"].log.log.gte(_D(26))
            },
            unlocked() {
                return hasUpgrade("s2", 71)
            },
            onExit() {
                layers[this.layer].annihilation()
            },
            completionLimit: 1
        },
    },
    doReset(resettingLayer) {
        return
    },
    layerShown() { return hasMilestone("m", 6) && hasChallenge("s1", 11) },
    hotkeys: [
        {
            key: "a",
            description: "a: 硬重置萨玛定理:公理世界",
            onPress() {
                player["S2"] = {
                    log: {
                        points: _D1,
                        log: _D0
                    },
                    antilog: {
                        points: _D0,
                        log: _D(-30)
                    }
                }
                player[this.layer].upgrades = []
            },
            unlocked() { return layers[this.layer].layerShown() && !hasChallenge("s2", 11) }
        }
    ],
    branches: ["s3","b"]
});

addLayer("s3", {
    name: "电子",
    symbol: "💻",
    resource: "电子",
    row: 3,
    position: 0,
    color: "#e0e0e0",
    type: "null",
    startData() {
        return {
            unlocked: true,
            points: _D10
        }
    },
    getWisdom() {
        return _D(buyableEffect(this.layer, 11)[0])
    },
    getTech() {
        return _D100
            .mul(hasUpgrade(this.layer, 13) ? upgradeEffect(this.layer, 13) : _D1)
            .mul(hasUpgrade(this.layer, 14) ? upgradeEffect(this.layer, 14) : _D1)
            .mul(hasUpgrade(this.layer, 22) ? upgradeEffect(this.layer, 22) : _D1)
            .mul(hasUpgrade(this.layer, 31) ? upgradeEffect(this.layer, 31) : _D1)
            .mul(hasUpgrade(this.layer, 32) ? upgradeEffect(this.layer, 32) : _D1)
            .mul(hasUpgrade(this.layer, 33) ? upgradeEffect(this.layer, 33) : _D1)
            .mul(hasMilestone(this.layer, 4) ? layers[this.layer].milestones[4].effect() : _D1)

    },
    update(diff) {
        if (!layers[this.layer].layerShown()) return;

        player["S3"].tech = player["S3"].tech.add(this.getTech().mul(diff))

        player[this.layer].points = player[this.layer].points.add(
            gridEffect(this.layer, 101).mul(diff)
        )
        for (let i = 2; i <= 15; i++) {
            let addtion = gridEffect(this.layer, i * 100 + 1).mul(diff)
            setGridData(this.layer, i * 100 - 99, getGridData(this.layer, i * 100 - 99).add(addtion))
        }

        if (!hasUpgrade('s3', 101)) return;
        player["S3"].wisdom = Decimal.min(player["S3"].wisdom.add(this.getWisdom().mul(diff)), buyableEffect(this.layer, 12))

        if (!hasUpgrade('s3', 51)) return;
        for (let i = 102; i <= 1502; i += 100) {
            if (layers[this.layer].grid.getCanClick(getGridData(this.layer, i), i)) {
                layers[this.layer].grid.onClick(getGridData(this.layer, i), i)
            }
        }
    },
    infoboxes: {
        0: {
            title: "萨玛定理 - 断言",
            body() {
                return `
                你决定去解开萨玛定理,尽管你根本不知道它是什么<br>
                只是从别人的话语之中听到的这个东西,是否有意义?<br>
                你不知道你所求何物,那你应该如何求解?你不知道<br>
                现在退出还来得及,但你不想放弃——N□□□□□<br>
                ` },
        },
        1: {
            title: "前人的智慧",
            body() {
                return `
                过往的记忆给了你力量<br>
                你将这些深深刻入脑海<br>
                人类的本能教会你一切<br>
                成就的加成在此处有效`
            }
        }
    },
    tabFormat: {
        Hardware: {
            content: [
                ["infobox", 0],
                "main-display",
                ["display-text", function () {
                    return `(${formatWhole(gridEffect(this.layer, 101))}/秒)`
                }],
                "main-s3-tech-display",
                ["display-text", function () {
                    return `(${formatWhole(layers[this.layer].getTech())}/秒)`
                }],
                () => { return hasUpgrade('s3', 101) ? "main-s3-wisdom-display" : "" },
                ["display-text", function () {
                    return hasUpgrade('s3', 101) ? `(${format(layers[this.layer].getWisdom())}/秒)` : ""
                }],
                ["display-text", function () {
                    return hasUpgrade('s3', 101) ?  `预计充满在 <h3 id="points">${layers['s3'].getFillTime(0)}</h3> (${layers['s3'].getFillTime(1)} 后)` : ""
                }],
                "blank",
                ["display-text", function () {
                    return `购买比例 ${player[this.layer].per ? player[this.layer].per : 100}%`
                }],
                ["slider", ["per", 1, 100]],
                "blank",
                ["clickable", 11],
                "blank",
                "grid",
                "blank",
                ["display-text", function () {
                    return `购买比例 ${player[this.layer].per ? player[this.layer].per : 100}%`
                }],
                ["slider", ["per", 1, 100]],
                "blank",
                ["clickable", 11],
                "blank",
                "main-display",
                ["display-text", function () {
                    return `(${formatWhole(gridEffect(this.layer, 101))}/秒)`
                }],
                "main-s3-tech-display",
                ["display-text", function () {
                    return `(${formatWhole(layers[this.layer].getTech())}/秒)`
                }],
                () => { return hasUpgrade('s3', 101) ? "main-s3-wisdom-display" : "" },
                ["display-text", function () {
                    return hasUpgrade('s3', 101) ? `(${format(layers[this.layer].getWisdom())}/秒)` : ""
                }],
                ["display-text", function () {
                    return hasUpgrade('s3', 101) ?  `预计充满在 <h3 id="points">${layers['s3'].getFillTime(0)}</h3> (${layers['s3'].getFillTime(1)} 后)` : ""
                }],
                "blank",
            ]
        },
        Technology: {
            content: [
                ["infobox", 0],
                "main-display",
                ["display-text", function () {
                    return `(${formatWhole(gridEffect(this.layer, 101))}/秒)`
                }],
                "main-s3-tech-display",
                ["display-text", function () {
                    return `(${formatWhole(layers[this.layer].getTech())}/秒)`
                }],
                () => { return hasUpgrade('s3', 101) ? "main-s3-wisdom-display" : "" },
                ["display-text", function () {
                    return hasUpgrade('s3', 101) ? `(${format(layers[this.layer].getWisdom())}/秒)` : ""
                }],
                ["display-text", function () {
                    return hasUpgrade('s3', 101) ?  `预计充满在 <h3 id="points">${layers['s3'].getFillTime(0)}</h3> (${layers['s3'].getFillTime(1)} 后)` : ""
                }],
                "blank",
                "upgrades"
            ]
        },
        Wisdom: {
            content: [
                ["infobox", 1],
                "main-s3-wisdom-display",
                ["display-text", function () {
                    return `(${format(layers[this.layer].getWisdom())}/秒)`
                }],
                "blank",
                ["display-text", function () {
                    return `预计充满在 <h3 id="points">${layers['s3'].getFillTime(0)}</h3> (${layers['s3'].getFillTime(1)} 后)`
                }],
                "blank",
                ['bar', 'WisdomBar'],
                "blank",
                ["display-text", function () {
                    return `购买比例 ${player[this.layer].wper ? player[this.layer].wper : 100}%`
                }],
                ["slider", ["wper", 1, 100]],
                "blank",
                "buyables"
            ],
            unlocked() {
                return hasUpgrade('s3', 101)
            }
        },
        World: {
            content: [
                ["display-text", function () {
                    return `你的世界维度在 <h1 id="points">${((x) => x == 10 ? "无限" : x )(player['S3'].world + 3)}</h1> 维`
                }],
                "blank",
                ["clickable", 21],
                "blank",
                ["clickable", 22],
                "blank",
                "milestones"
            ],
            unlocked() {
                return player['S3'].world != 0 || hasUpgrade('s3', 101)
            }
        }
    },
    getFillTime(id) {
        const current = player['S3'].wisdom;
        const max = buyableEffect(this.layer, 12);
        const rate = layers[this.layer].getWisdom();

        const remaining = Decimal.sub(max, current);
        const secondsNeeded = Decimal.div(remaining, rate).toNumber();

        if (Decimal.lte(remaining, 0)) return ["已满", "0 秒"][id];

        const futureTimestamp = Date.now() + secondsNeeded * 1000;
        const futureDate = new Date(futureTimestamp);

        return [futureDate.toLocaleString('zh', { timeZone: 'Asia/Shanghai' }), formatTime(secondsNeeded)][id]
    },
    bars: {
        WisdomBar: {
            direction: RIGHT,
            width: 500,
            height: 40,
            progress() { return player["S3"].wisdom.div(buyableEffect(this.layer, 12)) },
            display() {
                return `<h3 id="points">${formatWhole(player["S3"].wisdom)}/${formatWhole(buyableEffect(this.layer, 12))}</h3>`
            }
        },
    },
    grid: {
        rows() { return Math.min(2 * player["S3"].world + 3, hasUpgrade(this.layer, 12) ? player["S3"].layer : Math.min(2, player["S3"].layer)) },
        cols: 3,
        maxRows: 15,
        getLayer(id) {
            return layer = ~~(id / 100);
        },
        canBuyCount(now, price, id) {
            let effect = gridEffect(this.layer, id + 2)
                .mul(hasMilestone(this.layer, 3) ? layers[this.layer].milestones[3].effect() : _D1)
                .mul(hasUpgrade(this.layer, 33) ? upgradeEffect(this.layer, 33) : _D1)

            if (now.lt(price) || player["S3"].tech.lt(_D1)) return [_D0, _D0, _D0]
            else if (now.mul(this.getPer()).lt(price)) return [_D1, price, effect]
            else {
                let count = Decimal.floor(
                    Decimal.min(
                        now.mul(this.getPer()).div(price),
                        player["S3"].tech.mul(this.getPer())
                    )
                )
                return [count, count.mul(price), count
                    .mul(effect)
                ]
            }
        },
        calBuyPrice(id, layer) {
            switch (id % 100) {
                case 1:
                    return (
                        _D10
                            .sub(hasUpgrade("s3", 21) ? upgradeEffect("s3", 21) : _D0)
                            .sub(buyableEffect(this.layer, 22))
                            .sub(hasMilestone(this.layer, 8) ? layers[this.layer].milestones[8].effect() : _D0)
                    ).pow(layer)
                        .div(layer == 9 ? (
                            hasUpgrade("s3", 35) ? _D5 : _D1
                        ) : _D1)
            }
        },
        calPrice(id, level) {
            switch (id % 100) {
                case 2:
                    return _D(42).mul(_D(420).pow(level))
                case 3:
                    return pow10(level)
            }
        },
        getPer() {
            let p = player[this.layer].per
            return (p ? p : 100) / 100
        },
        layerName(layer) {
            if (layer == 0) return "电子"
            return [
                hasUpgrade("s3", 11) ? "晶体管" : "真空管",
                "逻辑门",
                "IC芯片",
                "缓存单元",
                "CPU",
                "主板",
                "个人电脑",
                "服务器",
                "服务器集群",
                "超级计算机",
                "行星计算集群",
                "戴森球网络",
                "黑洞计算机",
                "宇宙模拟器",
                "真理"
            ][layer - 1]
        },
        getStartData() {
            return _D0
        },
        onClick(data, id) {
            let layer = this.getLayer(id);
            let targetData
            switch (id % 100) {
                case 1:
                    if (layer == 1) targetData = player[this.layer].points
                    else targetData = getGridData(this.layer, id - 100)

                    let buyCount = this.canBuyCount(targetData, this.calBuyPrice(id, layer), id)
                    if (buyCount[0].lt(_D1)) return

                    player["S3"].layer = Math.max(player["S3"].layer, layer + 1)

                    setGridData(this.layer, id, data.add(buyCount[2]))

                    if (layer == 1) player[this.layer].points = player[this.layer].points.sub(buyCount[1])
                    else setGridData(this.layer, id - 100, targetData.sub(buyCount[1]))

                    player["S3"].tech = player["S3"].tech.sub(buyCount[0])

                    return
                case 2:
                    targetData = getGridData(this.layer, id - 1)
                    if (!hasUpgrade("s3", 25)) setGridData(this.layer, id - 1, targetData.sub(this.calPrice(id, data)))
                    setGridData(this.layer, id, data.add(_D1))
                    return
                case 3:
                    targetData = getGridData(this.layer, id + 98)
                    setGridData(this.layer, id + 98, targetData.sub(this.calPrice(id, data)))
                    setGridData(this.layer, id, data.add(_D1))
                    return
            }
        },
        getDisplay(data, id) {
            let layer = this.getLayer(id);
            let targetData
            switch (id % 100) {
                case 1:
                    if (layer == 1) targetData = player[this.layer].points
                    else targetData = getGridData(this.layer, id - 100)

                    let buyCount = this.canBuyCount(targetData, this.calBuyPrice(id, layer), id)

                    return `${this.layerName(layer)}
                    数量 ${formatWhole(data)}
                    产量 ${format(this.getOutput(id))}/秒
                    产能 ${format(gridEffect(this.layer, id))}/秒
                    ${buyCount[0] == 0 ? `你需要 ${formatWhole(this.calBuyPrice(id, layer))} ${this.layerName(layer - 1)}` : `点击生产 ${formatWhole(buyCount[2])} 个,开销:
                    ${formatWhole(buyCount[1])} ${this.layerName(layer - 1)}和 ${formatWhole(buyCount[0])} 科技`}
                    `
                case 2:
                    return `产量激增 等级${data}
                    产量×${formatWhole(gridEffect(this.layer, id))}
                    ${hasUpgrade("s3", 25) ? "下一级在" : "开销"}:
                    ${formatWhole(this.calPrice(id, data))} ${this.layerName(layer)}
                    `
                case 3:
                    return `生产分裂 等级${data}
                    生产×${formatWhole(gridEffect(this.layer, id))}
                    开销:
                    ${formatWhole(this.calPrice(id, data))} ${this.layerName(layer + 1)}
                    `
            }
        },
        getCanClick(data, id) {
            let layer = this.getLayer(id);
            let targetData
            switch (id % 100) {
                case 1:
                    if (layer == 1) targetData = player[this.layer].points
                    else targetData = getGridData(this.layer, id - 100)
                    return this.canBuyCount(targetData, this.calBuyPrice(id, layer), id)[0].gte(_D1)
                case 2:
                    targetData = getGridData(this.layer, id - 1)
                    return targetData.gte(this.calPrice(id, data))
                case 3:
                    targetData = getGridData(this.layer, id + 98)
                    return targetData.gte(this.calPrice(id, data))
            }
        },
        getOutput(id) {
            let layer = this.getLayer(id);
            let base = new Decimal(layer);

            base = base.add(buyableEffect(this.layer, 21))

            base = base.pow(_D2)

            if (layer == 1 && hasUpgrade("s3", 11)) base = base.mul(upgradeEffect("s3", 11))
            if (layer <= 4 && hasUpgrade("s3", 15)) base = base.mul(upgradeEffect("s3", 15))
            if (layer == 5 && hasUpgrade("s3", 23)) base = base.mul(upgradeEffect("s3", 23))
            if (layer == 7 && hasUpgrade("s3", 34)) base = base.mul(upgradeEffect("s3", 34))

            let power = gridEffect(this.layer, id + 1)
            return base.mul(power)
        },
        getEffect(data, id) {
            switch (id % 100) {
                case 1:
                    return this.getOutput(id).mul(data)
                case 2:
                    if (hasUpgrade("s3", 25)) return _D(100).pow(data.div(5))
                    return _D2.pow(data)
                case 3:
                    if (hasUpgrade("s3", 24)) return _D3.pow(data.add(1))
                        .mul(hasUpgrade("s3", 31) ? upgradeEffect("s3", 31) : _D1)
                    return _D2.pow(data)
            }
        },
        getStyle(data, id) {
            switch (id % 100) {
                case 1:
                    if (id == 1501) return {
                        width: "624px",
                        height: "135px",
                        fontSize: "0.9em",
                    }
                    else return {
                        width: "300px",
                        height: "135px",
                        fontSize: "0.9em",
                    }
                case 2:
                    return {
                        width: "160px",
                        height: "100px",
                        fontSize: "0.8em"
                    }
                case 3:
                    return {
                        width: "160px",
                        height: "100px",
                        fontSize: "0.8em"
                    }
            }
        },
        getUnlocked(id) {
            if (id == 1502 || id == 1503) return false
            return true
        }
    },
    clickables: {
        11: {
            title() {
                return "最大化产量激增(Z)"
            },
            style() {
                return {
                    width: "150px",
                    height: "40px",
                    minHeight: "40px",
                }
            },
            canClick() {
                return true
            },
            unlocked() {
                return true
            },
            onClick() {
                for (let i = 102; i <= 1502; i += 100) {
                    while (layers[this.layer].grid.getCanClick(getGridData(this.layer, i), i)) {
                        layers[this.layer].grid.onClick(getGridData(this.layer, i), i)
                    }
                }
            },
        },
        21: {
            title() {
                return `<h2
                style="color:hsl(${(Date.now() / 15) % 360}, 100%, 80%);
                text-shadow: 0 0 10px hsl(${(Date.now() / 15 + 180) % 360}, 100%, 50%);
                ">转生</h2>`
            },
            display() {
                let world = player["S3"].world * 2 + 3
                return `
                    需要
                    <h2>${formatWhole(this.getTarget(world, 0))} / 1 ${this.getTarget(world, 1)}</h2>
                    <h2>${formatWhole(player["S3"].wisdom)} / ${formatWhole(this.getRequireWisdom())} 智慧</h2>
                `
            },
            style() {
                return {
                    width: "360px",
                    height: "60px",
                    color: "#d8d8d8",
                    background: `linear-gradient(to right, 
                    hsl(0, 0%, ${35 + Math.sin(Date.now() / 1000) * 15}%), 
                    hsl(0, 0%, ${35 + Math.cos(Date.now() / 1000) * 15}%))`,
                    border: "4px solid",
                    borderRadius: "4px",
                    borderColor: "rgba(0, 0, 0, 0.125)"
                }
            },
            canClick() {
                if (player["S3"].world >= 7) return false
                let world = player["S3"].world * 2 + 3
                return this.getTarget(world, 0).gte(1) && player["S3"].wisdom.gte(this.getRequireWisdom())
            },
            unlocked() {
                return true && player["S3"].world < 7
            },
            onClick() {
                doReset(this.layer, true)
            },
            getTarget(layer, id) {
                let name = layers[this.layer].grid.layerName(layer);
                let count = getGridData(this.layer, layer * 100 + 1)

                return [
                    count, name
                ][id]
            },
            getRequireWisdom() {
                return [
                    30,
                    100,
                    200,
                    500,
                    1000,
                    5000,
                    25960
                ][player["S3"].world]
            }
        },
        22: {
            title() {
                return `<h2
                style="color:hsl(${(Date.now() / 15) % 360}, 100%, 50%);
                text-shadow: 0 0 10px hsl(${(Date.now() / 15 + 180) % 360}, 100%, 30%);
                ">卡关了?</h2>`
            },
            style() {
                return {
                    width: "360px",
                    height: "60px",
                    background: `linear-gradient(in hsl longer hue to right, 
                    hsl(${(-Date.now() / 35) % 360}, 50%, 30%), 
                    hsl(${(-Date.now() / 35 + 1) % 360}, 50%, 30%)`,
                    border: "4px solid",
                    borderRadius: "4px",
                    borderColor: "rgba(0, 0, 0, 0.125)"
                }
            },
            canClick() {
                return true
            },
            unlocked() {
                return getBuyableAmount(this.layer, 23).gte(512) && player["S3"].world < 7
            },
            onClick() {
                doReset(this.layer, true)
            },
        },
    },
    buyables: {
        11: {
            title() {
                return `意识<br>Lv ${formatWhole(getBuyableAmount("s3", 11))} / ${formatWhole(this.purchaseLimit())}`
            },
            display() {
                return `
                    <h3>思考的前提</h3><br><h3>每秒获得 <h2>${format(buyableEffect(this.layer, 11)[0])}</h2> 智慧</h3><br><h3>并提升智慧容量至 <h2>${format(buyableEffect(this.layer, 11)[1])}</h2> 倍</h3><br><br><h3>开销: ${formatWhole(this.cost())} 智慧</h3>
                `
            },
            cost() {
                let x = getBuyableAmount("s3", 11)
                return _D([
                    50,
                    135,
                    300,
                    700,
                    1750,
                    4700,
                    13650,
                    43200
                ][x]).div(buyableEffect(this.layer, 23))
            },
            effect(x) {
                return [_D([
                    0.05,
                    0.1,
                    0.2,
                    0.3,
                    0.45,
                    0.6,
                    0.75,
                    1,
                    2
                ][x])
                    .mul(player.achievementsSpeed)
                    .mul(_D1.add(buyableEffect(this.layer, 13).div(100)))
                    .mul(hasMilestone(this.layer, 2) ? layers[this.layer].milestones[2].effect() : _D1)
                    .mul(hasUpgrade("s3", 41) ? upgradeEffect("s3", 41) : _D1)
                    .add(hasMilestone(this.layer, 7) ? layers[this.layer].milestones[7].effect() : _D0)
                    , _D3.pow(x.div(6))]
            },
            canAfford() { return player['S3'].wisdom.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                if (getBuyableAmount("s3", 11).gte(this.purchaseLimit())) return;
                player['S3'].wisdom = (player['S3'].wisdom).sub(this.cost())
                addBuyables("s3", 11, _D1)
            },
            purchaseLimit() {
                return _D8
            }
        },
        12: {
            title() {
                return `大脑<br>Lv ${formatWhole(getBuyableAmount("s3", 12))} / ${formatWhole(this.purchaseLimit())}`
            },
            display() {
                return `
                    <h3>思维的容器</h3><br><h3>智慧上限被设为 <h2>${format(buyableEffect(this.layer, 12))}</h2> 点</h3><br><br><h3>开销: ${hasMilestone(this.layer, 6) ? format(this.cost()) : formatWhole(this.cost())} 智慧</h3><br><h3>点击以 ${formatWhole(this.buyCount().mul(this.cost()))} 智慧生长 ${formatWhole(this.buyCount())} 个</h3>
                `
            },
            cost() {
                return _D5
                    .div(
                        hasMilestone(this.layer, 6) ? layers[this.layer].milestones[6].effect(1) : _D1
                    )
            },
            effect(x) {
                return getYFromOrderedPoints(
                    [
                        [0, 5],
                        [10, 100],
                        [100, 400],
                        [1000, 1200],
                        [10000, 3000],
                        [100000, 6000]
                    ]
                    , x
                ).mul(buyableEffect(this.layer, 11)[1])
            },
            canAfford() { return player['S3'].wisdom.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                if (getBuyableAmount("s3", 12).gte(this.purchaseLimit())) return;

                let buyCount = this.buyCount()

                player['S3'].wisdom = (player['S3'].wisdom).sub(this.buyCount().mul(this.cost()))
                addBuyables("s3", 12, buyCount)
            },
            buyCount() {
                if (!this.canAfford()) return _D0;
                let limit = this.purchaseLimit().sub(getBuyableAmount("s3", 12));
                let canBuyMax = player['S3'].wisdom.div(this.cost());

                if (limit.eq(0)) return _D0
                if (canBuyMax.mul(this.getwPer()).lte(1)) return _D1
                else {
                    return Decimal.floor(Decimal.min(
                        limit, canBuyMax.mul(this.getwPer())
                    ))
                }
            },
            purchaseLimit() {
                return pow10(5)
            },
            getwPer() {
                let p = player[this.layer].wper
                return (p ? p : 100) / 100
            }
        },
        13: {
            title() {
                return `脊髓<br>Lv ${formatWhole(getBuyableAmount("s3", 13))} / ${formatWhole(this.purchaseLimit())}`
            },
            display() {
                return `
                    <h3>本能的载体</h3><br><h3>智慧获取增加 <h2>${format(buyableEffect(this.layer, 13))}</h2> %</h3><br><br><h3>开销: ${hasMilestone(this.layer, 6) ? format(this.cost()) : formatWhole(this.cost())} 智慧</h3><br><h3>点击以 ${formatWhole(this.buyCount().mul(this.cost()))} 智慧生长 ${formatWhole(this.buyCount())} 个</h3>
                `
            },
            cost() {
                return _D5
                    .div(
                        hasMilestone(this.layer, 6) ? layers[this.layer].milestones[6].effect(1) : _D1
                    )
            },
            effect(x) {
                return getYFromOrderedPoints(
                    [
                        [0, 0],
                        [20, 25],
                        [40, 45],
                        [80, 70],
                        [160, 100],
                        [320, 135],
                        [640, 175],
                        [1280, 220],
                        [2560, 270],
                        [5120, 325],
                        [10240, 385],
                        [20480, 450],
                        [40960, 520],
                        [100000, 600]
                    ]
                    , x
                )
            },
            canAfford() { return player['S3'].wisdom.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                if (getBuyableAmount("s3", 13).gte(this.purchaseLimit())) return;

                let buyCount = this.buyCount()

                player['S3'].wisdom = (player['S3'].wisdom).sub(this.buyCount().mul(this.cost()))
                addBuyables("s3", 13, buyCount)
            },
            buyCount() {
                if (!this.canAfford()) return _D0;
                let limit = this.purchaseLimit().sub(getBuyableAmount("s3", 13));
                let canBuyMax = player['S3'].wisdom.div(this.cost());

                if (limit.eq(0)) return _D0
                if (canBuyMax.mul(this.getwPer()).lte(1)) return _D1
                else {
                    return Decimal.floor(Decimal.min(
                        limit, canBuyMax.mul(this.getwPer())
                    ))
                }
            },
            purchaseLimit() {
                return pow10(5)
            },
            getwPer() {
                let p = player[this.layer].wper
                return (p ? p : 100) / 100
            }
        },
        21: {
            title() {
                return `欲望<br>Lv ${formatWhole(getBuyableAmount("s3", 21))} / ${formatWhole(this.purchaseLimit())}`
            },
            display() {
                return `
                    <h3>行为的动机</h3><br><h3>基础产量增加 <h2>${format(buyableEffect(this.layer, 21))}</h2></h3><br><br><h3>开销: ${formatWhole(this.cost())} 智慧</h3><br><h3>点击以 ${formatWhole(this.buyCount().mul(this.cost()))} 智慧产生 ${formatWhole(this.buyCount())} 个</h3>
                `
            },
            cost() {
                return _D(10)
            },
            effect(x) {
                return getYFromOrderedPoints(
                    [
                        [0, 0],
                        [10000, 256],
                    ]
                    , x
                )
            },
            canAfford() { return player['S3'].wisdom.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                if (getBuyableAmount("s3", 21).gte(this.purchaseLimit())) return;

                let buyCount = this.buyCount()

                player['S3'].wisdom = (player['S3'].wisdom).sub(this.buyCount().mul(this.cost()))
                addBuyables("s3", 21, buyCount)
            },
            buyCount() {
                if (!this.canAfford()) return _D0;
                let limit = this.purchaseLimit().sub(getBuyableAmount("s3", 21));
                let canBuyMax = player['S3'].wisdom.div(this.cost());

                if (limit.eq(0)) return _D0
                if (canBuyMax.mul(this.getwPer()).lte(1)) return _D1
                else {
                    return Decimal.floor(Decimal.min(
                        limit, canBuyMax.mul(this.getwPer())
                    ))
                }
            },
            purchaseLimit() {
                return pow10(4)
            },
            getwPer() {
                let p = player[this.layer].wper
                return (p ? p : 100) / 100
            }
        },
        22: {
            title() {
                return `道德<br>Lv ${formatWhole(getBuyableAmount("s3", 22))} / ${formatWhole(this.purchaseLimit())}`
            },
            display() {
                return `
                    <h3>行为的约束</h3><br><h3>生产成本底数减少 <h2>${format(buyableEffect(this.layer, 22))}</h2></h3><br><br><h3>开销: ${formatWhole(this.cost())} 智慧</h3><br><h3>点击以 ${formatWhole(this.buyCount().mul(this.cost()))} 智慧产生 ${formatWhole(this.buyCount())} 个</h3>
                `
            },
            cost() {
                return _D(10)
            },
            effect(x) {
                return getYFromOrderedPoints(
                    [
                        [0, 0],
                        [10, 0.05],
                        [20, 0.09],
                        [40, 0.13],
                        [80, 0.18],
                        [160, 0.24],
                        [320, 0.32],
                        [640, 0.42],
                        [1280, 0.54],
                        [2560, 0.68],
                        [5120, 0.84],
                        [10000, 1.5],
                    ]
                    , x
                )
            },
            canAfford() { return player['S3'].wisdom.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                if (getBuyableAmount("s3", 22).gte(this.purchaseLimit())) return;

                let buyCount = this.buyCount()

                player['S3'].wisdom = (player['S3'].wisdom).sub(this.buyCount().mul(this.cost()))
                addBuyables("s3", 22, buyCount)
            },
            buyCount() {
                if (!this.canAfford()) return _D0;
                let limit = this.purchaseLimit().sub(getBuyableAmount("s3", 22));
                let canBuyMax = player['S3'].wisdom.div(this.cost());

                if (limit.eq(0)) return _D0
                if (canBuyMax.mul(this.getwPer()).lte(1)) return _D1
                else {
                    return Decimal.floor(Decimal.min(
                        limit, canBuyMax.mul(this.getwPer())
                    ))
                }
            },
            purchaseLimit() {
                return pow10(4)
            },
            getwPer() {
                let p = player[this.layer].wper
                return (p ? p : 100) / 100
            }
        },
        23: {
            title() {
                return `谋略<br>Lv ${formatWhole(getBuyableAmount("s3", 23))} / ${formatWhole(this.purchaseLimit())}`
            },
            display() {
                return `
                    <h3>行为的组合</h3><br><h3>意识价格除以 <h2>${format(buyableEffect(this.layer, 23))}</h2></h3><br><br><h3>开销: ${formatWhole(this.cost())} 智慧</h3><br><h3>点击以 ${formatWhole(this.buyCount().mul(this.cost()))} 智慧产生 ${formatWhole(this.buyCount())} 个</h3>
                `
            },
            cost() {
                return _D(100)
            },
            effect(x) {
                return getYFromOrderedPoints(
                    [
                        [0, 1],
                        [1, 1.1],
                        [2, 1.2],
                        [4, 1.3],
                        [8, 1.4],
                        [16, 1.5],
                        [32, 1.6],
                        [64, 1.7],
                        [128, 1.8],
                        [256, 1.9],
                        [512, 2.01],
                        [1000, 1],
                    ]
                    , x
                )
            },
            canAfford() { return player['S3'].wisdom.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                if (getBuyableAmount("s3", 23).gte(this.purchaseLimit())) return;

                let buyCount = this.buyCount()

                player['S3'].wisdom = (player['S3'].wisdom).sub(this.buyCount().mul(this.cost()))
                addBuyables("s3", 23, buyCount)
            },
            buyCount() {
                if (!this.canAfford()) return _D0;
                let limit = this.purchaseLimit().sub(getBuyableAmount("s3", 23));
                let canBuyMax = player['S3'].wisdom.div(this.cost());

                if (limit.eq(0)) return _D0
                if (canBuyMax.mul(this.getwPer()).lte(1)) return _D1
                else {
                    return Decimal.floor(Decimal.min(
                        limit, canBuyMax.mul(this.getwPer())
                    ))
                }
            },
            purchaseLimit() {
                return pow10(3)
            },
            getwPer() {
                let p = player[this.layer].wper
                return (p ? p : 100) / 100
            }
        },
    },
    upgrades: {
        101: {
            title: "智慧",
            description: "解锁大脑",
            tooltip: "",
            cost() {
                return player['S3'].world == 0 ? pow10(11) : 0
            },
        },
        11: {
            title: "[11]晶体管",
            description: "真空管升级为晶体管,产量×3",
            effect() {
                return _D3
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 11))}`
            },
            tooltip: "",
            cost: pow10(4),
        },
        12: {
            title: "[12]锗集成电路",
            description: "解锁IC芯片",
            tooltip: "",
            cost: pow10(7),
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "[13]研究员",
            description: "科技获取×1.5",
            effect() {
                return _D(1.5)
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 13))}`
            },
            tooltip: "",
            cost: pow10(9),
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        14: {
            title: "[14]科技涌现",
            description: "最高解锁硬件层级加成科技获取×1.2/层",
            effect() {
                return _D(1.2).pow(player["S3"].layer)
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 14))}`
            },
            tooltip: "",
            cost: pow10(11),
            unlocked() {
                return hasUpgrade(this.layer, 13) && player["S3"].world >= 1
            }
        },
        15: {
            title: "[15]高速缓存",
            description: "前四个层级的基础产量×2",
            effect() {
                return _D2
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 15))}`
            },
            tooltip: "",
            cost: pow10(13),
            unlocked() {
                return hasUpgrade(this.layer, 14)
            }
        },
        21: {
            title: "[21]成本控制",
            description: "每层生产成本底数-1",
            effect() {
                return _D1
            },
            effectDisplay() {
                return `-${format(upgradeEffect("s3", 21))}`
            },
            tooltip: "",
            cost: pow10(15),
            unlocked() {
                return hasUpgrade(this.layer, 15)
            }
        },
        22: {
            title: "[22]研究组",
            description: "科技加成自身获取",
            effect() {
                return player["S3"].tech.add(1).log(5).add(1)
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 22))}`
            },
            tooltip: "",
            cost: pow10(18),
            unlocked() {
                return hasUpgrade(this.layer, 21)
            }
        },
        23: {
            title: "[23]摩尔定律",
            description: `游戏时间加成CPU产量`,
            effect() {
                let x = _D2.pow(Decimal.div(player.gameTime, 10 * 12 * 30 * 24 * 60 * 60))
                x = x.gte(1000) ? Decimal.add(1000, x.sub(1000).log(1.3)) : x;
                return x
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 23))}${upgradeEffect("s3", 23).gte(_D(1000)) ? "<br>软上限在×1000" : ""}`
            },
            tooltip: "",
            cost: pow10(21),
            unlocked() {
                return hasUpgrade(this.layer, 22) && player["S3"].world >= 2
            }
        },
        24: {
            title: "[24]集群生产",
            description: `生产分裂效果提升,且获得一个免费等级`,
            tooltip: "",
            cost: pow10(32),
            unlocked() {
                return hasUpgrade(this.layer, 23)
            }
        },
        25: {
            title: "[25]无痛激增",
            description: "产量激增不再扣除硬件,且效果更强",
            cost: pow10(37),
            unlocked() {
                return hasUpgrade(this.layer, 24)
            }
        },
        31: {
            title: "[31]工业革命 III",
            description: "科技获取×4<br>生产×4",
            effect() {
                return _D4
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 31))}`
            },
            cost: pow10(42),
            unlocked() {
                return hasUpgrade(this.layer, 25)
            }
        },
        32: {
            title: "[32]实验室",
            description: "电子加成科技获取",
            effect() {
                return Decimal.max(_D1, player[this.layer].points.add(_D1).div(_D(1e35)).log(8))
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 32))}`
            },
            cost: pow10(50),
            unlocked() {
                return hasUpgrade(this.layer, 31) && player["S3"].world >= 3
            }
        },
        33: {
            title: "[33]科学之星",
            description: "时间流速×3<br>科技获取×3<br>生产×3",
            effect() {
                return _D(3)
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 33))}`
            },
            cost: pow10(58),
            unlocked() {
                return hasUpgrade(this.layer, 32)
            }
        },
        34: {
            title: "[34]局域网",
            description: "个人电脑数量加成自身产量",
            effect() {
                return getGridData(this.layer, 701).add(1).pow(0.1).log(1.001)
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 34))}`
            },
            tooltip: "",
            cost: pow10(66),
            unlocked() {
                return hasUpgrade(this.layer, 33)
            }
        },
        35: {
            title: "[35]冷却水",
            description: "服务器集群的生产价格/5",
            effect() {
                return _D5
            },
            effectDisplay() {
                return `/${format(upgradeEffect("s3", 35))}`
            },
            tooltip: "",
            cost: pow10(75),
            unlocked() {
                return hasUpgrade(this.layer, 34) && player["S3"].world >= 4
            }
        },
        41: {
            title: "[41]集群思维",
            description: "智慧获取×2",
            effect() {
                return _D(2)
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 41))}`
            },
            tooltip: "",
            cost: pow10(125),
            unlocked() {
                return hasUpgrade(this.layer, 35) && player["S3"].world >= 5
            }
        },
        42: {
            title: "[42]宇宙的答案",
            description: "结束这个层级<br>1 世界完成<br>无奖励",
            tooltip: "",
            cost: _D0,
            unlocked() {
                return player["S3"].world >= 7
            }
        },
        43: {
            title: "[43]南柯一梦",
            description: "电子加成梦境获取",
            effect() {
                return player[this.layer].points.add(1).log(4).pow(2).add(1)
            },
            effectDisplay() {
                return `×${format(upgradeEffect("s3", 43))}`
            },
            tooltip: "",
            cost: pow10(200),
            unlocked() {
                return hasUpgrade(this.layer, 35) && player["S3"].world >= 5
            }
        },
        51: {
            title: "[51]升级像朵小花",
            description: "自动最大化产量激增",
            tooltip: "",
            cost: pow10(300),
            unlocked() {
                return hasUpgrade(this.layer, 35) && player["S3"].world >= 5
            }
        },
    },
    milestones: {
        1: {
            requirementDescription: "3维",
            effectDescription: '这里只是一个普通的空间,毫无特殊之处,此外这里绝对和现实世界不一样<br>你发现你的科技在这里发展的很缓慢,这让你陷入了极长的等待<br>你开始感到很烦,直到你找到了前人留下的痕迹...',
            done() { return player["S3"].world >= 0 },
            unlocked() { return hasChallenge("s2", 11) }
        },
        2: {
            requirementDescription: "4维",
            effectDescription() {
                return `是的!这可行!在克服了最初的不适感之后,你惊讶的发现你能看清更多了<br>之前的迷雾逐渐被揭开,化作过往云烟,但你现在需要面对新的挑战<br>最高层级加成智慧获取×${format(this.effect())}`
            },
            effect() {
                return _D(1 + player["S3"].layer / 10)
                    .mul(hasMilestone(this.layer, 6) ? layers[this.layer].milestones[6].effect(0) : _D1)
            },
            done() { return player["S3"].world >= 1 },
            unlocked() { return this.done() }
        },
        3: {
            requirementDescription: "5维",
            effectDescription() {
                return `上一个世界的计算已经向你揭示了这里的美好,但你没想到它居然比你想象的更好<br>更高的维度代表你能让元件有更多的排列方式,这让你的工作变得轻而易举<br>最高层级加成生产×${format(this.effect())}`
            },
            effect() {
                return _D(1 + player["S3"].layer * 2)
                    .mul(hasMilestone(this.layer, 6) ? layers[this.layer].milestones[6].effect(0) : _D1)
            },
            done() { return player["S3"].world >= 2 },
            unlocked() { return this.done() }
        },
        4: {
            requirementDescription: "6维",
            effectDescription() {
                return `你已经到了六维,现在对你来说几乎没有什么难事,但你这时发现宇宙的能源开始短缺<br>可能是因为宇宙的"体积"变得如此之大,以至于物质的"密度"变得非常低,但这不是问题<br>最高层级加成科技获取×${format(this.effect())}`
            },
            effect() {
                return _D(1 + player["S3"].layer / 2)
                    .mul(hasMilestone(this.layer, 6) ? layers[this.layer].milestones[6].effect(0) : _D1)
            },
            done() { return player["S3"].world >= 3 },
            unlocked() { return this.done() }
        },
        5: {
            requirementDescription: "7维",
            effectDescription() {
                return `你说什么?这是七度空间?<br>叽里咕噜说什么呢,睡觉!<br>睡眠时间+${format(this.effect())}小时`
            },
            effect() {
                return _D(2)
            },
            done() { return player["S3"].world >= 4 },
            unlocked() { return this.done() }
        },
        6: {
            requirementDescription: "8维",
            effectDescription() {
                return `你预感到这将会是最后的准备工作,你将会是一个真正的英雄<br>"呼唤神祇的名"——"Nap□□□"<br>智慧加成4,5,6维里程碑效果×${format(this.effect(0))} 和 减少大脑和脊髓价格/${format(this.effect(1))}`
            },
            effect(id) {
                return [
                    _D(1).add(Decimal.clamp(player["S3"].wisdom.pow(0.5), _D(0), _D(100)).div(_D(100)).mul(_D(2))).min(_D(3)).max(_D(1)),
                    _D(1.2).add(Decimal.clamp(player["S3"].wisdom, _D(0), _D(1000)).div(_D(1000)).mul(_D(5.05))).min(_D(6.25)).max(_D(1.2))
                ][id]
            },
            done() { return player["S3"].world >= 5 },
            unlocked() { return this.done() }
        },
        7: {
            requirementDescription: "9维",
            effectDescription() {
                return `超越一切 震慑凡人 带来终结 机械降神<br>风暴之力 充满全身 最后一击 核心共振<br>最终智慧获取+10 转生保留升级`
            },
            effect() {
                return _D10
            },
            done() { return player["S3"].world >= 6 },
            unlocked() { return this.done() }
        },
        8: {
            requirementDescription: "超越",
            effectDescription() {
                return `你证明了萨玛定理,尽管你甚至不知道它是什么<br>现在,睡一觉吧,你值得<br>生产成本底数-3`
            },
            effect() {
                return _D3
            },
            done() { return player["S3"].world >= 7 },
            unlocked() { return this.done() }
        },
        //.mul(hasMilestone(this.layer, 0) ? layers[this.layer].milestones[0].effect() : _D1)
    },
    doReset(resettingLayer) {
        if (resettingLayer = "s3") {
            let truereset = layers[this.layer].clickables[21].canClick();
            let keepupgrade = hasMilestone(this.layer, 6);

            layerDataReset(this.layer, keepupgrade ? ["milestones", "upgrades"] : ["milestones"])

            player["S3"].tech = _D0
            player["S3"].wisdom = _D0
            player["S3"].layer = 1

            if (truereset) player["S3"].world++
        }
    },
    layerShown() { return hasChallenge("s2", 11) },
    hotkeys: [
        {
            key: "z",
            description: "z: 最大化产量激增",
            onPress() {
                layers[this.layer].clickables[11].onClick()
            },
            unlocked() { return layers[this.layer].layerShown() }
        }
    ],
});
