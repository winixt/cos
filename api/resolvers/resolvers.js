import query from './query';
import mutation from './mutation';
import subscription from './subscription';


const resolvers = Object.assign({}, query, mutation, subscription);

export default resolvers;
