// Documentation for API and code based on:
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.UpdateItem.html
// https://stackoverflow.com/questions/41915438/node-js-aws-dynamodb-updateitem

const AWS = require("aws-sdk");

// Set the region
AWS.config.update({
  region: "ap-southeast-2",
});

// Create DynamoDB and DynamoDB document client
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const params = {
  TableName: "n10956611",
  Key: { "qut-username": "n10956611@qut.edu.au" },
};

// Check if thave table exists and return true or false
async function checkTableExists() {
  try {
    await ddb.describeTable({ TableName: params.TableName }).promise();
    return true;
  } catch (error) {
    return false;
  }
}

//Update Page View Counter
async function incrementCounter() {
  let counter = await readCounter();

  // Check if there was an error if not increment the counter
  if (!counter.statusCode) {
    counter = parseInt(counter) + 1;

    const paramsUpdate = {
      TableName: params.TableName,
      Key: params.Key,
      UpdateExpression: "set pageviews = :r",
      ExpressionAttributeValues: {
        ":r": counter,
      },
    };
    await docClient.update(paramsUpdate).promise();
    return counter;
  } else {
    return counter.message;
  }
}

//Get Current Page View Count
async function readCounter() {
  let data;
  const tableExist = await checkTableExists();
  if (!tableExist) {
    return { statusCode: 404, message: "Table not found or bad key." };
  } else {
    try {
      data = await docClient.get(params).promise();
    } catch (error) {
      return { statusCode: error.statusCode, message: error.code };
    }

    // If views does not exist, set it to 0
    if (!data.Item.pageviews) {
      return "0";
    } else {
      return data.Item.pageviews;
    }
  }
}

module.exports = { incrementCounter, readCounter };
