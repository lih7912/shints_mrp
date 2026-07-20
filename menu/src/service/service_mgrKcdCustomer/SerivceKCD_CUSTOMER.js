import axios from 'axios';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export class ServiceKCD_CUSTOMER {

  async getDatasByParamKCD_CUSTOMER(qryName,  qryStatusCd) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.query({
      query: gql`
      `,
      variables: { "customerName": qryName, "statusCd": qryStatusCd },
    });
    console.log("KCD_CUSTOMER:", JSON.stringify(data.mgrKcdCustomerAllQuery.length));
    return (data.mgrKcdCustomerAllQuery);

    } catch (e) {
      return (e);
    }
  }

  async getDatasByParamKCD_BUYER(qryName,  qryStatusCd) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.query({
      query: gql`
      `,
      variables: { "customerName": qryName, "statusCd": qryStatusCd },
    });
    console.log("KCD_BUYER:", JSON.stringify(data.mgrKcdCustomerBuyerQuery.length));
    return (data.mgrKcdCustomerBuyerQuery);

    } catch (e) {
      return (e);
    }
  }

  async getDatasByParamKCD_VENDOR(qryName,  qryStatusCd) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.query({
      query: gql`
      `,
      variables: { "customerName": qryName, "statusCd": qryStatusCd },
    });
    console.log("KCD_VENDOR:", JSON.stringify(data.mgrKcdCustomerVendorQuery.length));
    return (data.mgrKcdCustomerVendorQuery);

    } catch (e) {
      return (e);
    }
  }

  async getDatasByParamKCD_FACTORY(qryName,  qryStatusCd) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.query({
      query: gql`
      `,
      variables: { "customerName": qryName, "statusCd": qryStatusCd },
    });
    console.log("KCD_FACTORY:", JSON.stringify(data.mgrKcdCustomerFactoryQuery.length));
    return (data.mgrKcdCustomerFactoryQuery);

    } catch (e) {
      return (e);
    }
  }

  async getDatasByParamKCD_PLACE(qryName,  qryStatusCd) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.query({
      query: gql`
      `,
      variables: { "customerName": qryName, "statusCd": qryStatusCd },
    });
    console.log("KCD_PLACE:", JSON.stringify(data.mgrKcdCustomerPlaceQuery.length));
    return (data.mgrKcdCustomerPlaceQuery);

    } catch (e) {
      return (e);
    }
  }



  async getDataOneKCD_BUYER(qryId) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.query({
      query: gql`
query OneQueryKCD_BUYER($oneQueryKcdBuyerId: Int!) {
  oneQueryKCD_BUYER(id: $oneQueryKcdBuyerId) {
"buyerCd":argData.BUYER_CD,
"buyerName":argData.BUYER_NAME,
"buyerAbbr":argData.BUYER_ABBR,
"buyerTeam":argData.BUYER_TEAM,
"shintsUser":argData.SHINTS_USER,
"userName":argData.USER_NAME,
"email":argData.EMAIL,
"telNo":argData.TEL_NO,
"faxNo":argData.FAX_NO,
"zipNo":argData.ZIP_NO,
"addr1":argData.ADDR1,
"addr2":argData.ADDR2,
"commFlag":argData.COMM_FLAG,
"salesTeam":argData.SALES_TEAM,
"natCd":argData.NAT_CD,
"bankCd":argData.BANK_CD,
"stsFlag":argData.STS_FLAG,
"bvtFlag":argData.BVT_FLAG,
"statusCd":argData.STATUS_CD,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"neoeBuyerCdMom":argData.NEOE_BUYER_CD_MOM,
"neoeBuyerCd":argData.NEOE_BUYER_CD,
"neoeA23":argData.NEOE_A23,
"lossFlag":argData.loss_flag,
"gloveFlag":argData.glove_flag,
"momCd":argData.MOM_CD,
"buyerType":argData.BUYER_TYPE,
"payRule":argData.PAY_RULE

  }
}

      `,
      variables: { "oneQueryKcdBuyerId": qryId },
    });
    console.log("KCD_BUYER:", JSON.stringify(data.oneQueryKCD_BUYER.length));
    return (data.oneQueryKCD_BUYER);

    } catch (e) {
      return (e);
    }
  }

  async getDataOneKCD_VENDOR(qryId) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.query({
      query: gql`
query OneQueryKCD_VENDOR($oneQueryKcdVendorId: Int!) {
  oneQueryKCD_VENDOR(id: $oneQueryKcdVendorId) {
"vendorCd":argData.VENDOR_CD,
"vendorName":argData.VENDOR_NAME,
"invoiceName":argData.INVOICE_NAME,
"vendorType":argData.VENDOR_TYPE,
"shintsUser":argData.SHINTS_USER,
"regNo":argData.REG_NO,
"president":argData.PRESIDENT,
"userName":argData.USER_NAME,
"part":argData.PART,
"rank1":argData.RANK1,
"email":argData.EMAIL,
"telNo":argData.TEL_NO,
"faxNo":argData.FAX_NO,
"payType":argData.PAY_TYPE,
"payTerm":argData.PAY_TERM,
"leadTime":argData.LEAD_TIME,
"bankCd":argData.BANK_CD,
"natCd":argData.NAT_CD,
"zipNo":argData.ZIP_NO,
"addr1":argData.ADDR1,
"addr2":argData.ADDR2,
"statusCd":argData.STATUS_CD,
"permit":argData.PERMIT,
"vendorMatlType":argData.VENDOR_MATL_TYPE,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"bank1":argData.BANK1,
"bank2":argData.BANK2,
"gw":argData.GW,
"approkey":argData.APPROKEY,
"bankCd2":argData.BANK_CD2,
"bankCd3":argData.BANK_CD3,
"neoeNo":argData.NEOE_NO,
"remark":argData.REMARK

  }
}

      `,
      variables: { "oneQueryKcdVendorId": qryId },
    });
    console.log("KCD_VENDOR:", JSON.stringify(data.oneQueryKCD_VENDOR.length));
    return (data.oneQueryKCD_VENDOR);

    } catch (e) {
      return (e);
    }
  }

  async getDataOneKCD_FACTORY(qryId) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.query({
      query: gql`
query OneQueryKCD_FACTORY($oneQueryKcdFactoryId: Int!) {
  oneQueryKCD_FACTORY(id: $oneQueryKcdFactoryId) {
"factoryCd":argData.FACTORY_CD,
"factoryName":argData.FACTORY_NAME,
"factoryName2":argData.FACTORY_NAME2,
"userName":argData.USER_NAME,
"email":argData.EMAIL,
"country":argData.COUNTRY,
"telNo":argData.TEL_NO,
"faxNo":argData.FAX_NO,
"zipNo":argData.ZIP_NO,
"addr1":argData.ADDR1,
"addr2":argData.ADDR2,
"port":argData.PORT,
"airport":argData.AIRPORT,
"natCd":argData.NAT_CD,
"bankCd":argData.BANK_CD,
"statusCd":argData.STATUS_CD,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"tagPo":argData.tag_po,
"tagOrder":argData.tag_order,
"placeCd":argData.place_cd,
"packName":argData.PACK_NAME

  }
}

      `,
      variables: { "oneQueryKcdFactoryId": qryId },
    });
    console.log("KCD_FACTORY:", JSON.stringify(data.oneQueryKCD_FACTORY.length));
    return (data.oneQueryKCD_FACTORY);

    } catch (e) {
      return (e);
    }
  }

  async getDataOneKCD_PLACE(qryId) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.query({
      query: gql`
query OneQueryKCD_PLACE($oneQueryKcdPlaceId: Int!) {
  oneQueryKCD_PLACE(id: $oneQueryKcdPlaceId) {
"id":argData.id,
"placeCd":argData.PLACE_CD,
"placeName":argData.PLACE_NAME,
"placeType":argData.PLACE_TYPE,
"deliveryType":argData.DELIVERY_TYPE,
"userName":argData.USER_NAME,
"telNo":argData.TEL_NO,
"statusCd":argData.STATUS_CD,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"":argData.

  }
}

      `,
      variables: { "oneQueryKcdPlaceId": qryId },
    });
    console.log("KCD_PLACE:", JSON.stringify(data.oneQueryKCD_PLACE.length));
    return (data.oneQueryKCD_PLACE);

    } catch (e) {
      return (e);
    }
  }



  async createDataKCD_BUYER(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    console.log("INPUT INSERT(KCD_BUYER)=<" + JSON.stringify(argData));

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
"buyerCd":argData.BUYER_CD,
"buyerName":argData.BUYER_NAME,
"buyerAbbr":argData.BUYER_ABBR,
"buyerTeam":argData.BUYER_TEAM,
"shintsUser":argData.SHINTS_USER,
"userName":argData.USER_NAME,
"email":argData.EMAIL,
"telNo":argData.TEL_NO,
"faxNo":argData.FAX_NO,
"zipNo":argData.ZIP_NO,
"addr1":argData.ADDR1,
"addr2":argData.ADDR2,
"commFlag":argData.COMM_FLAG,
"salesTeam":argData.SALES_TEAM,
"natCd":argData.NAT_CD,
"bankCd":argData.BANK_CD,
"stsFlag":argData.STS_FLAG,
"bvtFlag":argData.BVT_FLAG,
"statusCd":argData.STATUS_CD,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"neoeBuyerCdMom":argData.NEOE_BUYER_CD_MOM,
"neoeBuyerCd":argData.NEOE_BUYER_CD,
"neoeA23":argData.NEOE_A23,
"lossFlag":argData.loss_flag,
"gloveFlag":argData.glove_flag,
"momCd":argData.MOM_CD,
"buyerType":argData.BUYER_TYPE,
"payRule":argData.PAY_RULE

			},
    });
    console.log("KCD_BUYER INSERT:", JSON.stringify(data.createKCD_BUYER));
    return (data.createKCD_BUYER);

    } catch (e) {
    console.log("KCD_BUYER INSERT ERROR:", JSON.stringify(e));
    return (e);
    }
  }

  async createDataKCD_VENDOR(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    console.log("INPUT INSERT(KCD_VENDOR)=<" + JSON.stringify(argData));

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
"vendorCd":argData.VENDOR_CD,
"vendorName":argData.VENDOR_NAME,
"invoiceName":argData.INVOICE_NAME,
"vendorType":argData.VENDOR_TYPE,
"shintsUser":argData.SHINTS_USER,
"regNo":argData.REG_NO,
"president":argData.PRESIDENT,
"userName":argData.USER_NAME,
"part":argData.PART,
"rank1":argData.RANK1,
"email":argData.EMAIL,
"telNo":argData.TEL_NO,
"faxNo":argData.FAX_NO,
"payType":argData.PAY_TYPE,
"payTerm":argData.PAY_TERM,
"leadTime":argData.LEAD_TIME,
"bankCd":argData.BANK_CD,
"natCd":argData.NAT_CD,
"zipNo":argData.ZIP_NO,
"addr1":argData.ADDR1,
"addr2":argData.ADDR2,
"statusCd":argData.STATUS_CD,
"permit":argData.PERMIT,
"vendorMatlType":argData.VENDOR_MATL_TYPE,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"bank1":argData.BANK1,
"bank2":argData.BANK2,
"gw":argData.GW,
"approkey":argData.APPROKEY,
"bankCd2":argData.BANK_CD2,
"bankCd3":argData.BANK_CD3,
"neoeNo":argData.NEOE_NO,
"remark":argData.REMARK

			},
    });
    console.log("KCD_VENDOR INSERT:", JSON.stringify(data.createKCD_VENDOR));
    return (data.createKCD_VENDOR);

    } catch (e) {
    console.log("KCD_VENDOR INSERT ERROR:", JSON.stringify(e));
    return (e);
    }
  }

  async createDataKCD_FACTORY(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    console.log("INPUT INSERT(KCD_FACTORY)=<" + JSON.stringify(argData));

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
"factoryCd":argData.FACTORY_CD,
"factoryName":argData.FACTORY_NAME,
"factoryName2":argData.FACTORY_NAME2,
"userName":argData.USER_NAME,
"email":argData.EMAIL,
"country":argData.COUNTRY,
"telNo":argData.TEL_NO,
"faxNo":argData.FAX_NO,
"zipNo":argData.ZIP_NO,
"addr1":argData.ADDR1,
"addr2":argData.ADDR2,
"port":argData.PORT,
"airport":argData.AIRPORT,
"natCd":argData.NAT_CD,
"bankCd":argData.BANK_CD,
"statusCd":argData.STATUS_CD,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"tagPo":argData.tag_po,
"tagOrder":argData.tag_order,
"placeCd":argData.place_cd,
"packName":argData.PACK_NAME

			},
    });
    console.log("KCD_FACTORY INSERT:", JSON.stringify(data.createKCD_FACTORY));
    return (data.createKCD_FACTORY);

    } catch (e) {
    console.log("KCD_FACTORY INSERT ERROR:", JSON.stringify(e));
    return (e);
    }
  }

  async createDataKCD_PLACE(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    console.log("INPUT INSERT(KCD_PLACE)=<" + JSON.stringify(argData));

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
"id":argData.id,
"placeCd":argData.PLACE_CD,
"placeName":argData.PLACE_NAME,
"placeType":argData.PLACE_TYPE,
"deliveryType":argData.DELIVERY_TYPE,
"userName":argData.USER_NAME,
"telNo":argData.TEL_NO,
"statusCd":argData.STATUS_CD,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"":argData.

			},
    });
    console.log("KCD_PLACE INSERT:", JSON.stringify(data.createKCD_PLACE));
    return (data.createKCD_PLACE);

    } catch (e) {
    console.log("KCD_PLACE INSERT ERROR:", JSON.stringify(e));
    return (e);
    }
  }


  
  async updateDataKCD_BUYER(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
				"updateKcdBuyerId": argData.id,
"buyerCd":argData.BUYER_CD,
"buyerName":argData.BUYER_NAME,
"buyerAbbr":argData.BUYER_ABBR,
"buyerTeam":argData.BUYER_TEAM,
"shintsUser":argData.SHINTS_USER,
"userName":argData.USER_NAME,
"email":argData.EMAIL,
"telNo":argData.TEL_NO,
"faxNo":argData.FAX_NO,
"zipNo":argData.ZIP_NO,
"addr1":argData.ADDR1,
"addr2":argData.ADDR2,
"commFlag":argData.COMM_FLAG,
"salesTeam":argData.SALES_TEAM,
"natCd":argData.NAT_CD,
"bankCd":argData.BANK_CD,
"stsFlag":argData.STS_FLAG,
"bvtFlag":argData.BVT_FLAG,
"statusCd":argData.STATUS_CD,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"neoeBuyerCdMom":argData.NEOE_BUYER_CD_MOM,
"neoeBuyerCd":argData.NEOE_BUYER_CD,
"neoeA23":argData.NEOE_A23,
"lossFlag":argData.loss_flag,
"gloveFlag":argData.glove_flag,
"momCd":argData.MOM_CD,
"buyerType":argData.BUYER_TYPE,
"payRule":argData.PAY_RULE

			},
    });
    console.log("KCD_BUYER UPDATE:", JSON.stringify(data.updateKCD_BUYER));
    return (data.updateKCD_BUYER);

    } catch (e) {
      return (e);
    }
  }

  async updateDataKCD_VENDOR(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
				"updateKcdVendorId": argData.id,
"vendorCd":argData.VENDOR_CD,
"vendorName":argData.VENDOR_NAME,
"invoiceName":argData.INVOICE_NAME,
"vendorType":argData.VENDOR_TYPE,
"shintsUser":argData.SHINTS_USER,
"regNo":argData.REG_NO,
"president":argData.PRESIDENT,
"userName":argData.USER_NAME,
"part":argData.PART,
"rank1":argData.RANK1,
"email":argData.EMAIL,
"telNo":argData.TEL_NO,
"faxNo":argData.FAX_NO,
"payType":argData.PAY_TYPE,
"payTerm":argData.PAY_TERM,
"leadTime":argData.LEAD_TIME,
"bankCd":argData.BANK_CD,
"natCd":argData.NAT_CD,
"zipNo":argData.ZIP_NO,
"addr1":argData.ADDR1,
"addr2":argData.ADDR2,
"statusCd":argData.STATUS_CD,
"permit":argData.PERMIT,
"vendorMatlType":argData.VENDOR_MATL_TYPE,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"bank1":argData.BANK1,
"bank2":argData.BANK2,
"gw":argData.GW,
"approkey":argData.APPROKEY,
"bankCd2":argData.BANK_CD2,
"bankCd3":argData.BANK_CD3,
"neoeNo":argData.NEOE_NO,
"remark":argData.REMARK

			},
    });
    console.log("KCD_VENDOR UPDATE:", JSON.stringify(data.updateKCD_VENDOR));
    return (data.updateKCD_VENDOR);

    } catch (e) {
      return (e);
    }
  }

  async updateDataKCD_FACTORY(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
				"updateKcdFactoryId": argData.id,
"factoryCd":argData.FACTORY_CD,
"factoryName":argData.FACTORY_NAME,
"factoryName2":argData.FACTORY_NAME2,
"userName":argData.USER_NAME,
"email":argData.EMAIL,
"country":argData.COUNTRY,
"telNo":argData.TEL_NO,
"faxNo":argData.FAX_NO,
"zipNo":argData.ZIP_NO,
"addr1":argData.ADDR1,
"addr2":argData.ADDR2,
"port":argData.PORT,
"airport":argData.AIRPORT,
"natCd":argData.NAT_CD,
"bankCd":argData.BANK_CD,
"statusCd":argData.STATUS_CD,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"tagPo":argData.tag_po,
"tagOrder":argData.tag_order,
"placeCd":argData.place_cd,
"packName":argData.PACK_NAME

			},
    });
    console.log("KCD_FACTORY UPDATE:", JSON.stringify(data.updateKCD_FACTORY));
    return (data.updateKCD_FACTORY);

    } catch (e) {
      return (e);
    }
  }

  async updateDataKCD_PLACE(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
				"updateKcdPlaceId": argData.id,
"id":argData.id,
"placeCd":argData.PLACE_CD,
"placeName":argData.PLACE_NAME,
"placeType":argData.PLACE_TYPE,
"deliveryType":argData.DELIVERY_TYPE,
"userName":argData.USER_NAME,
"telNo":argData.TEL_NO,
"statusCd":argData.STATUS_CD,
"regUser":argData.REG_USER,
"regDatetime":argData.REG_DATETIME,
"updUser":argData.UPD_USER,
"updDatetime":argData.UPD_DATETIME,
"":argData.

			},
    });
    console.log("KCD_PLACE UPDATE:", JSON.stringify(data.updateKCD_PLACE));
    return (data.updateKCD_PLACE);

    } catch (e) {
      return (e);
    }
  }



  async deleteDataKCD_BUYER(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
  			"deleteKcdBuyerId": argData.id 
			},
    });
    console.log("KCD_BUYER DELETE:", JSON.stringify(data.deleteKCD_BUYER));
    return (data.deleteKCD_BUYER);

    } catch (e) {
      return (e);
    }
  }

  async deleteDataKCD_VENDOR(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
  			"deleteKcdVendorId": argData.id 
			},
    });
    console.log("KCD_VENDOR DELETE:", JSON.stringify(data.deleteKCD_VENDOR));
    return (data.deleteKCD_VENDOR);

    } catch (e) {
      return (e);
    }
  }

  async deleteDataKCD_FACTORY(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
  			"deleteKcdFactoryId": argData.id 
			},
    });
    console.log("KCD_FACTORY DELETE:", JSON.stringify(data.deleteKCD_FACTORY));
    return (data.deleteKCD_FACTORY);

    } catch (e) {
      return (e);
    }
  }

  async deleteDataKCD_PLACE(argData) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
      `,
      variables: { 
  			"deleteKcdPlaceId": argData.id 
			},
    });
    console.log("KCD_PLACE DELETE:", JSON.stringify(data.deleteKCD_PLACE));
    return (data.deleteKCD_PLACE);

    } catch (e) {
      return (e);
    }
  }



  async deletesDataKCD_BUYER(argDatas) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    var tObjs = [];
    var tIdx = 0;
    for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
      var tOne = argDatas[tIdx];
      var tOneObj = {};
      tOneObj.id = tOne.id;
      tObjs.push(tOneObj);
    }
    var tInputs = {};
    tInputs.ids = tObjs;
    console.log(JSON.stringify(tInputs));

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
mutation MgrKcdBuyerDeletes($ids: [InputKcdBuyerDeletes!]!) {
  mgrKcdBuyerDeletes(ids: $ids) {
    count
  }
}
      `,
      variables: tInputs 
    });
    console.log("KCD_BUYER DELETES:", JSON.stringify(data));
    return (data);

    } catch (e) {
      return (e);
    }
  }

  async deletesDataKCD_VENDOR(argDatas) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    var tObjs = [];
    var tIdx = 0;
    for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
      var tOne = argDatas[tIdx];
      var tOneObj = {};
      tOneObj.id = tOne.id;
      tObjs.push(tOneObj);
    }
    var tInputs = {};
    tInputs.ids = tObjs;
    console.log(JSON.stringify(tInputs));

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
mutation MgrKcdVendorDeletes($ids: [InputKcdVendorDeletes!]!) {
  mgrKcdVendorDeletes(ids: $ids) {
    count
  }
}
      `,
      variables: tInputs 
    });
    console.log("KCD_VENDOR DELETES:", JSON.stringify(data));
    return (data);

    } catch (e) {
      return (e);
    }
  }

  async deletesDataKCD_FACTORY(argDatas) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    var tObjs = [];
    var tIdx = 0;
    for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
      var tOne = argDatas[tIdx];
      var tOneObj = {};
      tOneObj.id = tOne.id;
      tObjs.push(tOneObj);
    }
    var tInputs = {};
    tInputs.ids = tObjs;
    console.log(JSON.stringify(tInputs));

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
mutation MgrKcdFactoryDeletes($ids: [InputKcdFactoryDeletes!]!) {
  mgrKcdFactoryDeletes(ids: $ids) {
    count
  }
}
      `,
      variables: tInputs 
    });
    console.log("KCD_FACTORY DELETES:", JSON.stringify(data));
    return (data);

    } catch (e) {
      return (e);
    }
  }

  async deletesDataKCD_PLACE(argDatas) {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
    });

    var tObjs = [];
    var tIdx = 0;
    for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
      var tOne = argDatas[tIdx];
      var tOneObj = {};
      tOneObj.id = tOne.id;
      tObjs.push(tOneObj);
    }
    var tInputs = {};
    tInputs.ids = tObjs;
    console.log(JSON.stringify(tInputs));

    try {

    const { loading, error, data } = await client.mutate({
      mutation: gql`
mutation MgrKcdPlaceDeletes($ids: [InputKcdPlaceDeletes!]!) {
  mgrKcdPlaceDeletes(ids: $ids) {
    count
  }
}
      `,
      variables: tInputs 
    });
    console.log("KCD_PLACE DELETES:", JSON.stringify(data));
    return (data);

    } catch (e) {
      return (e);
    }
  }



}
