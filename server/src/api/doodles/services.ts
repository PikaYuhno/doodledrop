import {FindOptions, Model as OriginalModel, BuildOptions} from 'sequelize';

type ModelStatic = typeof OriginalModel & {
  new(values?: object, options?: BuildOptions): OriginalModel;
}
export async function checkExistence(Model: ModelStatic, options?: FindOptions<any>): Promise<OriginalModel | null> {
    const exists = await Model.findOne(options);
    if (exists) return exists;
    return null;
}


