

var buffer = [3,255,3,255,3,255,3,255,3,255,3,255,3,255,3,255]; //sample buffer to test the crc code

function crc16(buf) {
    var crc = 0xFFFF;
    var crcHigh;
    var crcLow;
    var i, j;

    for (i = 0; i < buf.length; i++) {
        crc ^= buf[i];
        for (j = 8; j !== 0; j--)
            {
                if ((crc & 0x0001) !== 0)
                {
                        crc >>= 1;
                        crc ^= 0xA001;
                }
                else
                    {
                        crc >>= 1;
                }
            }
    }
    //bytes are wrong way round so doing a swap here..
    crcHigh = (crc & 0x00FF) << 8;
    crcLow = (crc & 0xFF00) >> 8;
    crcHigh |= crcLow;
    crc = crcHigh;
    return crc;
}

var crcCalc;
crcCalc = crc16(buffer).toString(16);   

msg.payload = crcCalc;

return msg;
