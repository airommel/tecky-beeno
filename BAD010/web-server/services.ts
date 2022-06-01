import { knex } from "./knex";
import { LogService } from "./log.service";

export let logService = new LogService(knex);