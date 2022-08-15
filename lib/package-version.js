const { isValidSemVer, parseSemVer } = require('semver-parser');

const getWeekNumber = (current = new Date()) => {
  const startDate = new Date(current.getFullYear(), 0, 1);
  const days = Math.floor((current - startDate) / (24 * 60 * 60 * 1000));

  return Math.ceil(days / 7);
};

class PackageVersion {
  constructor({ version }) {
    if (!isValidSemVer(version)) {
      throw new Error(`Can not be parsed version ${version}`);
    }
    this.semVer = parseSemVer(version);
  }

  bump() {
    const currentDate = new Date();
    const expectedMajorVersion = parseInt(currentDate.getFullYear().t.substr(2), 10);
    const expectedMinorVersion = getWeekNumber();

    if (expectedMajorVersion < this.semVer.major) {
      throw new Error(
        `Expected major version ${expectedMajorVersion} is lower than current major version ${this.semVer.major}. Review your version ${this.semVer.version}!`,
      );
    } else if (expectedMinorVersion < this.semVer.minor) {
      throw new Error(
        `Expected minor version ${expectedMinorVersion} is lower than current minor version ${this.semVer.minor}. Review your version!`,
      );
    }

    if (expectedMajorVersion > this.semVer.major || expectedMinorVersion > this.semVer.minor) {
      const version = `${expectedMajorVersion}.${expectedMinorVersion}.0`;
      console.log(
        `New ${
          expectedMajorVersion > this.semVer.major ? 'Major' : 'Minor'
        } version expected: ${version} `,
      );
      return {
        major: expectedMajorVersion,
        minor: expectedMinorVersion,
        patch: 0,
        version,
      };
    }

    const expectedPatchVersion = this.semVer.patch + 1;
    const version = `${expectedMajorVersion}.${expectedMinorVersion}.${expectedPatchVersion}`;

    console.log(`New patch version expected: ${version}`);
    return {
      major: expectedMajorVersion,
      minor: expectedMajorVersion,
      patch: expectedPatchVersion,
    };
  }
}

module.exports = PackageVersion;
