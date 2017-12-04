

function unMask (msg, maskKey) { // TODO ::: get code from decode method and paste it here.
	return;
}

function readFlags (encodedMsg) {
	var payLoadLength = encodedMsg[1] & 0x7F,
		masked = (encodedMsg[1] & 0x80) ? true: false, maskKeyStart, maskKey;
	var msgStart = maskKeyStart = 2;
	if (payLoadLength === 126) {
		msgStart = maskKeyStart = 4;
		payLoadLength = encodedMsg.slice(2, 4).readUIntBE(0, 2)
	} else if (payLoadLength === 127) {
		msgStart = maskKeyStart = 10;
		payLoadLength = encodedMsg.slice(2, 10).readUIntBE(0, 8);
	}

	if (masked) {
		maskKey = encodedMsg.slice(maskKeyStart, msgStart =  maskKeyStart + 4);
	}
	

	return {
		"isFinalMsg": (encodedMsg[0] & 0x80) ? true : false,
		"RSV": [(encodedMsg[0] & 0x40), (encodedMsg[0] & 0x20), (encodedMsg[0] & 0x10)],
		"opCode": encodedMsg[0] & 0x0F,
		masked,
		msgStart,
		maskKey,
		payLoadLength
	}
}

exports.readFlags = readFlags;