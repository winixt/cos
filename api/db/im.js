import { imMember, imRoom, imContent } from './table';

class IM {
  constructor({ connector }) {
    this.connector = connector;
  }

  getImMember(args) {
    const { uid } = args;
    return this.connector(imMember).where({
      uid,
    });
  }
  getImRoom(args) {
    const { rid } = args;
    return this.connector(imRoom).where({
      rid,
    });
  }
  getImContent(args) {
    const { rid, limit, offset } = args;
    return this.connector(imContent).where({
      rid,
    }).orderBy('ctime', 'desc')
      .limit(limit)
      .offset(offset);
  }
  addImMember(args) {
    return this.connector(imMember).insert(args);
  }
  addImRoom(args) {
    const other = {
      number: args.memberID.split('$').length,
      ctime: Date.now(),
    };
    return this.conector(imRoom).insert(Object.assign(other, args));
  }
  addImContent(args) {
    return this.connector(imContent)
      .insert(Object.assign({ ctime: Date.now() }, args));
  }
  delImMember(args) {
    const { rid, uid } = args;
    return this.connector(imMember).where({
      rid,
      uid,
    });
  }
  delImRoom(args) {
    const { rid, uid } = args;
    this.connector(imMember).where({
      rid,
    }).del();
    return this.connector(imRoom).where({
      rid,
      createrId: uid,
    }).del();
  }
  delImContent(args) {
    const { id, uid } = args;
    return this.connector(imContent).where({
      id,
      uid,
    }).del();
  }
}

export default IM;
