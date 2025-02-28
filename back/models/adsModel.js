const { sql } = require("../dbConnection");

exports.createAd = async (newAd) => {
  const [ad] = await sql`
          INSERT INTO ads ${sql(newAd, "name", "image_url", "description", "price", "category_id", "user_id")}
          RETURNING *;
          `;
  return ad;
};

exports.getAds = async (name, sortColumn) => {
    
    const adNameFilter = name ? `%${name}%` : ''; 

    const validColumns = ["category_id", "name"];
    const orderColumn = validColumns.includes(sortColumn) ? sortColumn : "category_id";

    const result = await sql.begin(async (sql) => {
      return sql`
          SELECT ads.*, categories.name AS category_name, 
                 jsonb_agg(
                   DISTINCT jsonb_build_object(
                     'id', reviews.id,
                     'name', reviews.name,
                     'ad_id', reviews.ad_id,
                     'comment', reviews.comment,
                     'created_at', reviews.created_at
                   )
                 ) FILTER (WHERE reviews.id IS NOT NULL) AS reviews
          FROM ads
          JOIN categories ON ads.category_id = categories.id
          LEFT JOIN reviews ON ads.id = reviews.ad_id
          WHERE 
            (ads.name ILIKE ${adNameFilter} OR ${adNameFilter} = '') 
          GROUP BY ads.id, categories.name
          ORDER BY categories.name ASC, ${sql(orderColumn)} ASC
        `;
    });

    return result;
};


exports.deleteUserAds = async (id, userId) => {
    const [ad] = await sql`
        DELETE FROM ads
        WHERE ads.id = ${id}
        AND ads.user_id = ${userId}
        RETURNING *;
        `;
    return ad;
  };


  
  
