import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'babar.db.elephantsql.com',
        port: 5432,
        username: 'yjlyrwpm',
        password: '9Nib_rr683secsHXeraVJJF9osJJXgdm',
        database: 'yjlyrwpm',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
