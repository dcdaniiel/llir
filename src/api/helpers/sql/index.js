const categoryByCompany = (cod) =>
  `SELECT cod as company, ct.name as name, ct.id as id FROM companies as c INNER JOIN categories as ct ON c.id = ct.company_id AND c.cod = '${cod}'`;

const getClaimsByClientCompanyID = (client_company_id) => `
        SELECT ac.claim as claim
          FROM user_auth AS ua
          INNER JOIN auth_claims AS ac ON ac.id = ua.auth_claim
        WHERE ua.client_company = '${client_company_id}'
      `;

const selectProductsByIds = (ids) => {
  const query = ids.reduce(
    (acc, uuid, index) =>
      acc.concat(`'${uuid}'${ids.length - 1 !== index ? ', ' : ''}`),
    ''
  );
  return `SELECT id, name, type, price FROM products WHERE id IN (${query})`;
};

module.exports = {
  categoryByCompany,
  getClaimsByClientCompanyID,
  selectProductsByIds,
};
