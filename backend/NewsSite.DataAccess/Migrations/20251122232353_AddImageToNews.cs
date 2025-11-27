using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsSite.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddImageToNews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageBase64",
                table: "News",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageBase64",
                table: "News");
        }
    }
}
