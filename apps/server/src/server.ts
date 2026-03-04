import type * as Party from "partykit/server";
import { onConnect } from "y-partykit";

export default class Server implements Party.Server {
  constructor(public party: Party.Room) { }
  onConnect(conn: Party.Connection) {
    return onConnect(conn, this.party, {
      persist: { mode: 'snapshot' }
    });
  }
}

Server satisfies Party.Worker;
