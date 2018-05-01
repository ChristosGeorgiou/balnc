import { RxCollection, RxDocument } from 'rxdb';
import { Injector } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Entity } from "@blnc/core/common/models/entity";
import { ConfigService } from "@blnc/core/common/services/config.service";
import { DatabaseService } from "@blnc/core/common/services/database.service";


export abstract class BaseService implements Resolve<any> {

    protected configService: ConfigService
    protected dbService: DatabaseService

    protected _module: string
    protected _entities: Entity[]

    protected _config: any
    protected _data: RxCollection<RxDocument<any>>[] = []

    constructor(injector: Injector) {
        this.configService = injector.get(ConfigService)
        this.dbService = injector.get(DatabaseService)
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        console.log("[BaseService]", "resolving...")
        await this.setup()
        return true
    }

    public async setup() {
        this._config = this.configService.getModuleConfig(this._module)
        await this.dbService.loadEntities(this._entities)
        this._entities.forEach(async e => {
            this._data[e.name] = await this.dbService.get(e.name)
        })
        console.log("[BaseService]", "setup", this._module)
    }

    public async all<T>(entity: string, params: any = {}) {
        params = Object.assign(params, { query: {} })
        const dd = this._data[entity] as RxCollection<T>
        if (!dd) { return [] }
        const res = await dd.find(params.query).exec()
        console.log("res", res)
        return res as T[]
    }

    public async one<T>(entity: string, id: string) {
        return await this._data[entity].findOne(id).exec() as T
    }

    public getStore(name) {
        const item = localStorage.getItem(`${this._module}/${name}`)
        return (item) ? JSON.parse(item) : {}
    }

    public setStore(name, value) {
        let item = null
        if (typeof value === "object") {
            item = JSON.stringify(value)
        } else {
            item = value
        }
        return localStorage.setItem(`${this._module}/${name}`, item)
    }
}