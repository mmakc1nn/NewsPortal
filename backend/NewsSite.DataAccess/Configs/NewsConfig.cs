using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NewsSite.Core.Models;
using NewsSite.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsSite.DataAccess.Configs
{
    public class NewsConfig : IEntityTypeConfiguration<NewsEntity>
    {
        public void Configure(EntityTypeBuilder<NewsEntity> builder)
        {
            builder.HasKey(builder => builder.Id);
            builder.Property(builder => builder.Title).IsRequired().HasMaxLength(News.MaxTitleLength);
            builder.Property(builder => builder.Content).IsRequired();
            builder.Property(builder => builder.PublishedTime).IsRequired();
            builder.Property(builder => builder.Author).IsRequired();
        }
    }
}
