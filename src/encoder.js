const FIN_BYTE = (isFinal) => isFinal ? 0x8 : 0x0,
	  MASK_BIT = (masked) => masked ? 0x1 : 0x0,
	  OP_CODE = {
	  	TEXT: 0x1,
	  	BINARY: 0x2
	  },
	  DATA_OP_CODE = (isBinaryData) => isBinaryData ? OP_CODE.BINARY : OP_CODE.TEXT,
	  CONCAT_NUMBER = (a, b) => (a << 4) + b;

function encode (isLast, isBinaryData, mask, data) { // assumption is data is string as now.
	var dataBuffer = Buffer.from(data);
	var sizeOfenCodeBuff = dataBuffer.length + 2;
	var encodedBuffer = Buffer.alloc(sizeOfenCodeBuff);
	encodedBuffer[0] = CONCAT_NUMBER(FIN_BYTE(isLast), DATA_OP_CODE(isBinaryData));
	console.log(encodedBuffer[0] === 129);
	encodedBuffer[1] = CONCAT_NUMBER(MASK_BIT(mask), dataBuffer.length);
	dataBuffer.copy(encodedBuffer, 2);
	return encodedBuffer;
}

exports.encode = encode;