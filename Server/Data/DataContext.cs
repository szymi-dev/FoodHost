using Microsoft.EntityFrameworkCore;
using Server.Models;
using System.Reflection;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext()
        {

        }

        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<ItemLike> ItemLikes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MenuItem>().Property(b => b.OldPrice).HasColumnType("decimal(18, 2)");
            modelBuilder.Entity<MenuItem>().Property(b => b.SalePrice).HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<ItemLike>()
                .HasKey(k => new { k.UserId, k.MenuItemId });


            modelBuilder.Entity<ItemLike>()
                .HasOne(k => k.User)
                .WithMany(k => k.LikedProducts)
                .HasForeignKey(k => k.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Jeżeli będzie trzeba skonfigurować drugi raz ten sam model to OnDelete(DeleteBehaviour.NoAction) - tylko w przypadku SQL SERVER !!!

        }
    }
}
