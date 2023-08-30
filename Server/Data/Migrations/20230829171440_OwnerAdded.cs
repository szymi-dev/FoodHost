using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class OwnerAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItems_Users_UserId",
                table: "MenuItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuItems_UserId",
                table: "MenuItems");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MenuItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MenuItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_UserId",
                table: "MenuItems",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItems_Users_UserId",
                table: "MenuItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
