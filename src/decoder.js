
var utils = require("./utils");

function decode (encodedMsg) {
	var wsHeaders = utils.readFlags(encodedMsg);
	console.log("is Finished ::: ", wsHeaders.isFinalMsg);
	console.log("payload length ::: ", wsHeaders.payLoadLength);
	console.log("msg masked ::: ", wsHeaders.masked);
	console.log("Opcode ::: ", wsHeaders.opCode);
	var msgBuff = encodedMsg.slice(wsHeaders.msgStart, wsHeaders.msgStart + wsHeaders.payLoadLength);
	console.log("Msg buff length from msg start ------> ",  encodedMsg.slice(wsHeaders.msgStart).length);
	console.log("Msg buff length ------> ", msgBuff.length);
	for (var i = 0; i < msgBuff.length; i++) {
		msgBuff[i] = msgBuff[i] ^ wsHeaders.maskKey[i % 4];
	}
	return {msg: msgBuff, opCode: wsHeaders.opCode, isFinalMsg: wsHeaders.isFinalMsg};
}

exports.decode = decode;