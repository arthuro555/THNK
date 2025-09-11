// The THNK Binary Protocol
//
// Every THNK message is sent as a packet, which is a Binary buffer.
// The first byte of the message is always the packet type.
//
// Packet types are defined by the PacketType enum.
// Data following the packet name is defined by the packet type.
//
// A sync packet is constructed like this:
//
// [
//                    ~~~ HEADER ~~~
//              <strings_count>, <strings>,
//             <v_table_length>, <v_table>,
//                    ~~~ CONTENT ~~~
//            <component_count>, <components>
// ]
//
// <string_count>: int32 The amount of new strings declared by the packet.
// <strings>
//    Every string used in the packet MUST be declared here.
//    When a packets
//    <string_id>: int32 The numeric ID of the string.
//    <string_content: int8[] The UTF-8 string.
// </strings>
//


