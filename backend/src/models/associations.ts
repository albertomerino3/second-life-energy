import { Tag } from "../modules/tags/tag.model.js";
import { ResourceTag } from "../modules/resource-tags/resource-tags.model.js";
import { Role } from "../modules/roles/role.model.js";
import { UserRole } from "../modules/user-roles/user-role.model.js";
import { SimulationArticle } from "../modules/simulation-articles/simulation-articles.model.js";
import { SimulationResource } from "../modules/simulation-resources/simulation-resource.model.js";

export function defineAssociations() {

    // relacion Tag - ResourceTag
    Tag.hasMany(ResourceTag, { foreignKey: "tagId", as: "resourceTags" });
    ResourceTag.belongsTo(Tag, { foreignKey: "tagId", as: "tag" });

    // relacion Role - UserRole
    Role.hasMany(UserRole, { foreignKey: "roleId", as: "userRoles" });
    UserRole.belongsTo(Role, { foreignKey: "roleId", as: "role" });

    // relacion SimulationArticle (necesitas importar Simulation y Article)
    // SimulationArticle.belongsTo(Simulation, { foreignKey: "simulationId", as: "simulation" });
    // SimulationArticle.belongsTo(Article, { foreignKey: "articleId", as: "article" });

    // relacion SimulationResource (necesitas importar Simulation y Resource)
    // SimulationResource.belongsTo(Simulation, { foreignKey: "simulationId", as: "simulation" });
    // SimulationResource.belongsTo(Resource, { foreignKey: "resourceId", as: "resource" });
}

//export function defineDetails() {
//    Bicycle.hasOne(BicycleDetail, { foreignKey: "bicycleId", as: "detail", onDelete: "CASCADE" });
//  BicycleDetail.belongsTo(Bicycle, { foreignKey: "bicycleId", as: "bicycle" });
//}

//export function defineCustomer() {
//    Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
//    Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
//}

//export function defineOrder() {
//    Order.belongsToMany(Bicycle, { through: OrderItem, foreignKey: "orderId", otherKey: "bicycleId", as: "bicycles", });
//    Bicycle.belongsToMany(Order, { through: OrderItem, foreignKey: "bicycleId", otherKey: "orderId", as: "orders" });
//    Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
//    OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
//    Bicycle.hasMany(OrderItem, { foreignKey: "bicycleId", as: "orderItems" });
//    OrderItem.belongsTo(Bicycle, { foreignKey: "bicycleId", as: "bicycle" });
//}