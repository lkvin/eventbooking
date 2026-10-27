/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('users',(table)=>{
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('phone_number').unique().notNullable();
        table.string('role').defaultTo('customer');
        table.timestamps(true,true);
    });
    await knex.schema.createTable('venue',(table)=>{
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('address').notNullable()
    });
    await knex.schema.createTable('events',(table)=>{
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.uuid('venue_id').notNullable();
        table.foreign('venue_id').references('venue.id').onDelete("CASCADE");
        table.date('date').notNullable();
        table.time('start_time').notNullable();
        table.timestamps(true,true);
    });
    await knex.schema.createTable('events_zone',(table)=>{
        table.uuid('id').primary();
   
        table.uuid('event_id').notNullable();
        table.foreign('event_id').references('events.id').onDelete('CASCADE');

        table.string('zone').notNullable();
        table.integer('price').notNullable();
        table.integer('total_quan').notNullable();
        table.timestamps(true,true);
    });
    await knex.schema.createTable('orders',(table)=>{
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.string('payment_method').notNullable();
        table.string('payment_status').notNullable();
        table.integer('total_amount');
        table.timestamps(true,true);
    });
    await knex.schema.createTable('order_item',(table)=>{
        table.uuid('id').primary();
        table.uuid('order_id').notNullable();
        table.foreign('order_id').references('orders.id').onDelete('CASCADE');
        table.uuid('zone_id').notNullable();
        table.foreign('zone_id').references('events_zone.id').onDelete("CASCADE");
        table.uuid('event_id').notNullable();
        table.foreign('event_id').references('events.id').onDelete("CASCADE")
        table.string('qr_code').notNullable();
        table.boolean('is_used').defaultTo(false).notNullable();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
    console.log("Rolling back...");


    await knex.schema.dropTableIfExists('order_item');
    await knex.schema.dropTableIfExists('orders');
    await knex.schema.dropTableIfExists('events_zone');
    await knex.schema.dropTableIfExists('events');
    await knex.schema.dropTableIfExists('venue');
    await knex.schema.dropTableIfExists('users');
    
    console.log("Rollback complete!");
    
};
